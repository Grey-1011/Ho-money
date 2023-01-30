import { number } from 'echarts';
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { Button } from '../../shared/Button';
import { http } from '../../shared/Http';
import { Time } from '../../shared/time';
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
  props: {
    startDate: { 
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, context) {
    const items = ref<Item[]>([])
    const page = ref(0)
    const hasMore = ref(false)
    
    const fetchItems = async () => {
      const response = await http.get<Resources<Item>>(`/items`,{
        created_after: props.startDate,
        created_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndex',
      })
      const { resources, pager } = response.data
      items.value.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page - resources.length < pager.count
      page.value += 1
      // console.log(response);
    }

    onMounted( fetchItems )

    return () => (
      <div class={s.wrapper}>
        <ul class={s.total}>
          <li><span>收入</span><span>128</span></li>
          <li><span>支出</span><span>99</span></li>
          <li><span>净收入</span><span>39</span></li>
        </ul>
        <ol class={s.list}>
          {items.value.map(item => {
            return <li>
              <div class={s.sign}>
                <span>{item.tags[0].sign}</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>{item.tags[0].sign}</span>
                  <span class={s.amount}>￥{item.amount}</span>
                </div>
                <div class={s.time}>
                  {new Time(item.happen_at).format()}
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