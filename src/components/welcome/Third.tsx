import { defineComponent } from 'vue';
import s from './First.module.scss';
import icon from '../../assets/icons/database.svg';
import { RouterLink } from 'vue-router';

export const Third = defineComponent({
 setup(props, context) {
  return () => (
    <div class={s.wrapper}>
      <div class={s.card}>
        <img class={s.icon} src={icon}/>
        <h2>数据可视化<br />不遗漏每一笔账单</h2>
      </div>
      <div class={s.actions}>
        <RouterLink class={s.fake} to='/welcome/start'>跳过</RouterLink>
        <RouterLink class={s.next} to="/welcome/4">下一页</RouterLink>
        <RouterLink to='/welcome/start'>跳过</RouterLink>
      </div>
    </div>
  )
 }
})