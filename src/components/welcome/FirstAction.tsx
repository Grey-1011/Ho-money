import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';

export const FirstAction = () => (
  <div class={s.actions}>
    <RouterLink class={s.fake} to='/welcome/start'>跳过</RouterLink>
    <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
    <RouterLink to='/welcome/start'>跳过</RouterLink>
  </div>
)

FirstAction.displayName = 'FirstAction'