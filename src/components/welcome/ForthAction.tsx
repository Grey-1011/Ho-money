import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
const onClick = () => {
  localStorage.setItem('skipFeatures', 'yes')
}

export const ForthAction = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <span onClick={onClick}>
      <RouterLink class={s.next} to="/start">完成</RouterLink>
    </span>
    <SkipFeatures class={s.fake} />
  </div>
)

ForthAction.displayName = 'ForthAction'