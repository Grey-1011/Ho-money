import { number } from 'echarts';
import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import { Button } from '../../shared/Button';
import { Datetime } from '../../shared/Datetime';
import { http } from '../../shared/Http';
import { Money } from '../../shared/Money';
import { Time } from '../../shared/time';
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
  props: {
    startDate: { 
      type: String as PropType<string>
    },
    endDate: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    
    const items = ref<Item[]>([])
    const page = ref(0)
    const hasMore = ref(false)
    
    const fetchItems = async () => {
      if(!props.startDate || !props.endDate){ return }
      const response = await http.get<Resources<Item>>(`/items`,{
        created_after: props.startDate,
        created_before: props.endDate,
        page: page.value + 1,
      },
      { _mock: 'itemIndex' })
      const { resources, pager } = response.data
      items.value.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page - resources.length < pager.count
      page.value += 1
      // console.log(response);
    }

    onMounted( fetchItems )

    watch(()=>{
      return [props.startDate, props.endDate]
    },()=>{
      items.value = []
      hasMore.value = false
      page.value = 0
      fetchItems()
    })

    watch(()=>{
      return [props.startDate, props.endDate]
    }, ()=>{
      Object.assign(itemBalance, {expensesTotal: 0,incomeTotal: 0})
      fetchSummary('expenses')
      fetchSummary('income')
    })

    const itemBalance = reactive({
      expensesTotal: 0,incomeTotal: 0
    })
    const balance = computed(() => itemBalance.incomeTotal - itemBalance.expensesTotal )

    const fetchSummary = async (kind: string) => {
      if(!props.startDate || !props.endDate){ return }
      const response = await http.get<Resources['data']>('/items/summary', {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: kind,
        group_by: 'happen_at'
      },
      { _mock: 'itemSummary' })

      if(kind === 'expenses'){
        itemBalance.expensesTotal = response.data.total
      }else{ 
        itemBalance.incomeTotal = response.data.total
      }
      
    }

    onMounted(() => {
      fetchSummary('expenses')
      fetchSummary('income')
    })

    return () => (
      <div class={s.wrapper}>
        <ul class={s.total}>
          <li><span>收入</span><span>￥<Money value={itemBalance.incomeTotal}/></span></li>
          <li><span>支出</span><span>￥<Money value={itemBalance.expensesTotal}/></span></li>
          <li><span>净收入</span><span>￥<Money value={balance.value}/></span></li>
        </ul>
        <ol class={s.list}>
          {items.value.map(item => {
            return <li>
              <div class={s.sign}>
                <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>{ item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}</span>
                  <span class={s.amount}>￥<Money value={item.amount}/></span>
                </div>
                <div class={s.time}>
                  <Datetime value={item.happen_at} />
                </div>
              </div>
            </li>})  
          }
        </ol>
        <div class={s.more}>
          {hasMore.value ?
            <Button onClick={fetchItems}>加载更多</Button> :
            <span>没有更多</span>
          }
        </div>
      </div>
    )
  }
})