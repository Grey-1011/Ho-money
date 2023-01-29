import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../shared/Icon';
import { Time } from '../../shared/time';
import s from './InputPad.module.scss';

import 'vant/lib/index.css';
import { DatePicker, Popup } from 'vant';
import { calculate } from '../../shared/calculate';

export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number
  },
  emits: ['update:happenAt', 'update:amount'],
  
  setup(props, context) {
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => refDatePickerVisible.value = true
    const hideDatePicker = () => refDatePickerVisible.value = false

    const setDate = (val: { selectedValues: string[] } ) => { 
      context.emit('update:happenAt', val.selectedValues.join('-') )
      hideDatePicker() 
    }

    
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : '0')

    const handleClick = (n: string | number) => {
      calculate(refAmount, n)
    }

    const handleAdd = (add: string) => {
      calculate(refAmount, add, (x: number, y: number) => x + y)
    }

    const handleSubtract = (sub: string) => {
      calculate(refAmount, sub, (x, y) => x - y)
    }
    const handleSumbit = () => {

    }

    const buttons = [
      { text: '1', onClick: () => { handleClick(1) } },
      { text: '2', onClick: () => { handleClick(2) } },
      { text: '3', onClick: () => { handleClick(3) } },
      { text: '4', onClick: () => { handleClick(4) } },
      { text: '5', onClick: () => { handleClick(5) } },
      { text: '6', onClick: () => { handleClick(6) } },
      { text: '7', onClick: () => { handleClick(7) } },
      { text: '8', onClick: () => { handleClick(8) } },
      { text: '9', onClick: () => { handleClick(9) } },
      { text: '0', onClick: () => { handleClick(0) } },
      { text: '.', onClick: () => { handleClick('.') } },
      { text: '清空', onClick: () => { refAmount.value = '0'} },
      { text: '+', onClick: () => { handleAdd('+') } },
      { text: '-', onClick: () => { handleSubtract('-') } },
      { text: '提交', onClick: () => { context.emit('update:amount', parseFloat(refAmount.value) * 100) } },
    ]
    
    return () => <>
      <div class={s.dateAndAmount}>
        <span class={s.date}>
          <Icon name='date' class={s.icon}/>
          <span>
            <span onClick={ showDatePicker }>{new Time(props.happenAt).format()}</span>
              <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
	              <DatePicker modelValue={props.happenAt?.split('-')} title="选择日期" 
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