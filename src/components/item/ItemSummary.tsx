
import { Empty, showDialog } from 'vant';
import { computed, defineComponent, PropType, reactive, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useAfterMe } from '../../hooks/useAfterMe';
import { Button } from '../../shared/Button';
import { Center } from '../../shared/Center';
import { Datetime } from '../../shared/Datetime';
import { FloatButton } from '../../shared/FloatButton';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { Money } from '../../shared/Money';
import { useItemStore } from '../../stores/useItemStore';
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
   
    const itemStore = useItemStore(['items', props.startDate, props.endDate])
    useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate))

    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.$reset()
        itemStore.fetchItems(props.startDate, props.endDate)
      }
    )

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
        happen_after: props.startDate,
        happen_before: props.endDate,
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

    useAfterMe(() => {
      fetchSummary('expenses')
      fetchSummary('income')
    })

    return () => 
    !props.startDate || !props.endDate ? (
      <van-empty image="search" description="请选择时间" />
    ) : (
      <div class={s.wrapper}>
        {itemStore.items && itemStore.items.length > 0 ? (
          <>
            <ul class={s.total}>
              <li>
                <span>收入</span>
                <Money value={itemBalance.incomeTotal} />
              </li>
              <li>
                <span>支出</span>
                <Money value={itemBalance.expensesTotal} />
              </li>
              <li>
                <span>净收入</span>
                <Money value={balance.value} />
              </li>
            </ul>
            <ol class={s.list}>
              {itemStore.items.map((item) => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}</span>
                      <span class={item.kind === 'expenses' ? s.expensesAmount : s.incomeAmount}>
                        ￥<Money value={item.amount} />
                      </span>
                    </div>
                    <div class={s.time}>
                      <Datetime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {itemStore.hasMore ? (
                <Button onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button>
              ) : (
                <span>没有更多了</span>
              )}
            </div>
          </>
        ) : (
          <>
            <Center class={s.pig_wrapper} direction="|">
              <Icon name="finance_male" class={s.pig} />
              <p>所选时间暂无数据</p>
            </Center>
          </>
        )}
        <RouterLink to="/items/create">
          <FloatButton iconName="add" />
        </RouterLink>
      </div>
    )
  }
})