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

    const refAmount = ref('');
    const appendText = (n: number | string ) => { refAmount.value += n.toString() }
    const buttons = [
      { text: '1', onClick: () => { appendText(1) } },
      { text: '2', onClick: () => { appendText(2) } },
      { text: '3', onClick: () => { appendText(3) } },
      { text: '4', onClick: () => { appendText(4) } },
      { text: '5', onClick: () => { appendText(5) } },
      { text: '6', onClick: () => { appendText(6) } },
      { text: '7', onClick: () => { appendText(7) } },
      { text: '8', onClick: () => { appendText(8) } },
      { text: '9', onClick: () => { appendText(9) } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: '0', onClick: () => { appendText(0) } },
      { text: '清空', onClick: () => { refAmount.value = ''} },
      { text: '提交', onClick: () => { } },
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
        <span class={s.amount}>{ refAmount.value }</span>
      </div>
      <div class={s.buttons}>
        { buttons.map(button => 
          <button onClick={button.onClick}>{ button.text }</button>)  
        }
      </div>
    </>
  }
})