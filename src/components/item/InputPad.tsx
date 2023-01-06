import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../shared/Icon';
import { time } from '../../shared/time';
import s from './InputPad.module.scss';

import 'vant/lib/index.css';
import { DatePicker, Popup } from 'vant';

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    // 将 Date 转换为  string[]
    const now = [...new Date().toLocaleDateString().split('/')]
    const refDate = ref<string[]>(now)
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => refDatePickerVisible.value = true
    const hideDatePicker = () => refDatePickerVisible.value = false
    const setDate = (val: { selectedValues: string[]; }) => { refDate.value = val.selectedValues; hideDatePicker() }

    const buttons = [
      {text: '1', onClick: () => {}},
      {text: '2', onClick: () => {}},
      {text: '3', onClick: () => {}},
      {text: '清空', onClick: () => {}},
      {text: '4', onClick: () => {}},
      {text: '5', onClick: () => {}},
      {text: '6', onClick: () => {}},
      {text: '+', onClick: () => {}},
      {text: '7', onClick: () => {}},
      {text: '8', onClick: () => {}},
      {text: '9', onClick: () => {}},
      {text: '-', onClick: () => {}},
      {text: '.', onClick: () => {}},
      {text: '0', onClick: () => {}},
      {text: '删除', onClick: () => {}},
      {text: '提交', onClick: () => {}},
    ]
    return () => <>
      <div class={s.dateAndAmount}>
        <span class={s.date}>
          <Icon name='date' class={s.icon}/>
          <span>
            <span onClick={ showDatePicker }>{time(new Date(refDate.value.toLocaleString())).format()}</span>
              <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
	              <DatePicker modelValue={refDate.value} title="选择日期" 
                  onConfirm={ setDate }
                  onCancel={ hideDatePicker }
                />
              </Popup>
          </span>
        </span>
        <span class={s.amount}>123456789</span>
      </div>
      <div class={s.buttons}>
        { buttons.map(button => 
          <button onClick={button.onClick}>{ button.text }</button>)  
        }
      </div>
    </>
  }
})