import { DatePicker, Popup } from 'vant';
import { computed, defineComponent, PropType, ref, toRaw } from 'vue';
import { Button } from './Button';
import { EmojiSelect } from './EmojiSelect';
import s from './Form.module.scss';
import { Time } from './time';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup(props, context) {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})


export const FormItem = defineComponent({
  props:{
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode' | 'select'>,
    },
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | string[]>,
    },
    error: {
      type: String,
    },
    SelectDate: {
      type: Array as PropType<string[]> ,
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array as PropType<{value: string, text: string}[]>
    }
  },
  emits:['update:modelValue'],
  setup(props, context) {
    const refDateVisible = ref(false)
    const content = computed(() => {
      switch(props.type){
        case 'text':
          return <input 
            value={props.modelValue} 
            placeholder={props.placeholder}
            onInput={(e: any)=> context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input, s.error]}/>
        case 'emojiSelect':
          return <EmojiSelect
            modelValue={props.modelValue?.toString()}
            onUpdateModelValue={value => context.emit('update:modelValue', value)}
            class={[s.formItem, s.emojiList, s.error]} />
        case 'validationCode':
          return <>
            <input class={[s.formItem, s.input, s.error, s.validationCode ]}
              placeholder={props.placeholder}
            />
            <Button class={[s.formItem, s.button, s.validationCodeButton]}>发送验证码</Button>
          </>
        case 'select':
          return <select class={[s.formItem, s.select, s.error]} value={props.modelValue}
          onChange={(e: any) => { context.emit('update:modelValue', e.target.value) }}
          >
            {props.options?.map((option) => {
              return <option value={option.value}>{option.text}</option>
            })}
          </select>
        case 'date':
          return <>
            <input readonly={true} value={props.modelValue}
              onClick={() => { refDateVisible.value = true }}
              class={[s.formItem, s.input]} />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatePicker modelValue={props.SelectDate} title="选择年月日"
                // onUpdate:modelValue={value => { context.emit('update:modelValue', value.join('-'))
                onConfirm={ ({selectedValues}) => {
                  context.emit('update:modelValue', selectedValues.join('-'))
                  refDateVisible.value = false
                }}
                onCancel={() => refDateVisible.value = false} />
            </Popup>
          </>
        case undefined:
          return context.slots.default?.()
      }
    })
    return () => {
      return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          <div class={s.formItem_errorHint}>
            <span>{props.error ?? '　'}</span>
          </div>
        </label>
      </div>
    }
  }
})


