import { defineComponent, PropType } from 'vue';
import s from './Charts.module.scss';
export const Charts = defineComponent({
  props: {
    startDate: { 
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    }
  },
  setup(props, context) {
    return () => (
      <div>图表</div>
    )
  }
})