import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Overlay } from '../shared/Overlay';
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
 setup(props, context) {
  const overlayVisible = ref(false);
  const onClickMenu = () => {
    overlayVisible.value = !overlayVisible.value;
  }

  return () => (
    <MainLayout>{
      {
        title: () => '不叮记账',
        icon: () => <Icon name='menu' class={s.navIcon} onClick={onClickMenu}/>,
        default: () => <>
          <Center class={s.wallet_wrapper}>
            <Icon name='wallet' class={s.wallet}/>
          </Center>
          <div class={s.button_wrapper}>
            <RouterLink to="/items/create">
              <Button class={s.button}>开始记账</Button>
            </RouterLink>
          </div>
          <RouterLink to="/items/create">
            <FloatButton iconName='add'/>
          </RouterLink>
          { overlayVisible.value && <Overlay onClose={() => overlayVisible.value = false}/> }
        </>
      }
    }</MainLayout>
  )
 }
})