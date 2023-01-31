import { defineComponent, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from "./Charts.module.scss";

import { Bars } from "./Bars";
import { PieChart } from "./PieChart";
import { LineChart } from "./LineChart";

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    const category = ref("expenses");
    
    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: "expenses", text: "支出" },
            { value: "income", text: "收入" },
          ]}
          v-model={category.value}
        />
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    );
  },
});
