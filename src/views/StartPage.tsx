import { defineComponent } from 'vue';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
 setup(props, context) {
  const onClick = () => {
    console.log('hi');
  }

  return () => (
    <div>
      <nav>menu</nav>
      <Center class={s.balance_wrapper}>
        <Icon name='balance' class={s.balance}/>
      </Center>
      <div class={s.button_wrapper}>
        <Button class={s.button} onClick={onClick}>Test</Button>
      </div>
      <FloatButton iconName='add'/>
    </div>
  )
 }
})