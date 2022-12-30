import { defineComponent } from 'vue';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Navbar } from '../shared/Navbar';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
 setup(props, context) {
  const onClick = () => {
    console.log('hi');
  }

  return () => (
    <div>
      <nav>
        <Navbar>
          {
            {default: '不叮记账', icon: <Icon name='menu' class={s.navIcon}/> }
          }
        </Navbar>
      </nav>
      <Center class={s.balance_wrapper}>
        <Icon name='balance' class={s.balance}/>
      </Center>
      <div class={s.button_wrapper}>
        <Button class={s.button} onClick={onClick}>开始记账</Button>
      </div>
      <FloatButton iconName='add'/>
    </div>
  )
 }
})