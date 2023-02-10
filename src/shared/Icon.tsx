import { defineComponent, PropType } from 'vue';
import s from './Icon.module.scss';

export type IconName = string
// 'add' | 'logo' | 'menu' | 'statistics' | 'export_data' 
// | 'remind' | 'wallet' | 'back' | 'date' | 'bill' | 'home' | 'finance_male'

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup(props, context) {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  }
})
