import { FunctionalComponent } from 'vue';
import s from './Welcome.module.scss';

export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref='#firstAd'></use>
      </svg>
      <h4>会挣钱<br />还要会省钱</h4>
    </div>
  )
}

First.displayName = 'First'
