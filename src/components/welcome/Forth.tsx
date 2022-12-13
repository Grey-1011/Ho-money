import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
import icon from '../../assets/icons/cloud.svg';
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const Forth = defineComponent({
 setup(props, context) {
  const slots = {
    icon: () => <img class={s.icon} src={icon}/>,
    title: () => <h2>数据可视化<br />不遗漏每一笔账单</h2>,
    buttons: () => <>
      <RouterLink class={s.fake} to='/welcome/start'>跳过</RouterLink>
      <RouterLink class={s.next} to="/welcome/start">完成</RouterLink>
      <RouterLink class={s.fake} to='/welcome/start'>跳过</RouterLink>
    </>
  }
  return () => (
    <WelcomeLayout v-slots={slots}>

    </WelcomeLayout>
  )
 }
})