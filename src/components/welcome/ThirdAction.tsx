import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';

export const ThirdAction = () => (
  <div class={s.actions}>
    <RouterLink class={s.fake} to='/welcome/start'>跳过</RouterLink>
    <RouterLink class={s.next} to="/welcome/4">下一页</RouterLink>
    <RouterLink to='/welcome/start'>跳过</RouterLink>
  </div>
)

ThirdAction.displayName = 'ThirdAction'