import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';

export const FirstAction = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
    <SkipFeatures />
  </div>
)

FirstAction.displayName = 'FirstAction'