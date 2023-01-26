import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';

export const ThirdAction = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <RouterLink class={s.next} to="/welcome/4">下一页</RouterLink>
    <SkipFeatures />
  </div>
)

ThirdAction.displayName = 'ThirdAction'