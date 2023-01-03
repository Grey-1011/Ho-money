import { defineComponent, ref } from 'vue';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Navbar } from '../shared/Navbar';
import { Overlay } from '../shared/Overlay';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
 setup(props, context) {
  const overlayVisible = ref(false);
  const onClickMenu = () => {
    overlayVisible.value = !overlayVisible.value;
  }

  return () => (
    <div>
      <div>
        <Navbar>
          {
            {default: () => '不叮记账', 
            icon: () => <Icon name='menu' class={s.navIcon} onClick={onClickMenu}/> }
          }
        </Navbar>
        { overlayVisible.value && <Overlay onClose={() => overlayVisible.value = false}/> }
      </div>
      <Center class={s.balance_wrapper}>
        <Icon name='balance' class={s.balance}/>
      </Center>
      <div class={s.button_wrapper}>
        <Button class={s.button}>开始记账</Button>
      </div>
      <FloatButton iconName='add'/>
    </div>
  )
 }
})