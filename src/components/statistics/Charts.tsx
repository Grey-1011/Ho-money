import { defineComponent, PropType, ref } from 'vue';
import { FormItem } from '../../shared/Form';
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
    const category = ref('expenses')
    return () => (
      <div class={s.wrapper}>
        |{ category.value }|
        <FormItem label='类型' type='select' options={[
          { value: 'expenses', text: '支出' },
          { value: 'income', text: '收入' }
        ]} v-model={ category.value }/>

      </div>
    )
  }
})