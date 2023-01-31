import { computed, defineComponent, onMounted, PropType, ref, toRaw } from "vue";
import { FormItem } from "../../shared/Form";
import s from "./Charts.module.scss";
import { Bars } from "./Bars";
import { PieChart } from "./PieChart";
import { LineChart } from "./LineChart";
import { http } from "../../shared/Http";

type Data1Item = {tag: Tag, created_at:string, amount: number}
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
    const kind = ref("expenses");
    const data1 = ref<Data1>([])

    const betterData1 = computed(() => {
      return data1.value.map(item => 
        [item.tag.created_at, item.amount] as [string, number]
      )
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
      console.log('res.data=>',response.data);
      
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
