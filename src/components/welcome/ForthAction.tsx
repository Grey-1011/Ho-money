import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';

export const ForthAction = () => (
  <div class={s.actions}>
    <RouterLink class={s.fake} to='/welcome/start'>跳过</RouterLink>
    <RouterLink class={s.next} to="/welcome/start">完成</RouterLink>
    <RouterLink class={s.fake} to='/welcome/start'>跳过</RouterLink>
  </div>
)

ForthAction.displayName = 'ForthAction'