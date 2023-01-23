import { defineComponent, PropType } from 'vue';
import s from './Button.module.scss';

interface Props {
  
}

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<'important' | 'normal' | 'danger'>,
      default: 'important'
    },
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
    },
  },
  setup(props, context) {
    return () => (
      <button class={[s.button, s[props.level]]} type={props.type} onClick={props.onClick}>
        {context.slots.default?.()}
      </button>
    )
  }
})