import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';

export const ForthAction = () => (
  <div class={s.actions}>
    <RouterLink class={s.fake} to='/start'>跳过</RouterLink>
    <RouterLink class={s.next} to="/start">完成</RouterLink>
    <RouterLink class={s.fake} to='/start'>跳过</RouterLink>
  </div>
)

ForthAction.displayName = 'ForthAction'