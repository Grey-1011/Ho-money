import { computed, defineComponent, onMounted, onUpdated, PropType, ref, toRaw, watch } from "vue";
import { FormItem } from "../../shared/Form";
import s from "./Charts.module.scss";
import { Bars } from "./Bars";
import { PieChart } from "./PieChart";
import { LineChart } from "./LineChart";
import { http } from "../../shared/Http";
import { Time } from "../../shared/time";

type Data1Item = {tag: Tag, amount: number}
type Data1 = Data1Item[]

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>
    },
    endDate: {
      type: String as PropType<string>
    }
  },
  setup(props, context) {
    const DAY = 24 * 3600 * 1000;

    const kind = ref("expenses");
    const data1 = ref<Data1>([])

    const betterData1 = computed<[string, number][]>(() => {
      if(!props.startDate || !props.endDate){ return [] }

      const array = []
      let data1Index = 0
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime();
      const n = diff / DAY + 1;

      for(let i = 0; i < n; i++){
        const time = new Time(props.startDate+'T00:00:00.000+0800').add(i, 'day').getTimestamp()
        if(data1.value[data1Index] && new Date(data1.value[data1Index].tag.created_at).getTime() === time){
          array.push([new Date(time).toISOString(), data1.value[data1Index].amount])
          data1Index += 1;
        }else {
          array.push([new Date(time).toISOString(), 0])
        }
      }
      return array as [string, number][]
      // console.log(array)
    })
 
    onMounted(async () => {
      const response = await http.get<{groups: Data1, total: number}>('/items/summary', {
        happened_after: props.startDate!,
        happened_before: props.endDate!,
        kind: 'expenses',
        group_by: 'tag_id',
        _mock: 'itemSummary',
      })
      data1.value = response.data.groups
      console.log('res.data=>',response.data.groups);
      
    })
    

    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: "expenses", text: "支出" },
            { value: "income", text: "收入" },
          ]}
          v-model={kind.value}
        />
        <LineChart data={betterData1.value}/>
        <PieChart />
        <Bars />
      </div>
    );
  },
});
