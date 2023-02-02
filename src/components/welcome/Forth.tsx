import s from './Welcome.module.scss';

export const Forth = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#forthAd'></use>
    </svg>
    <h4>云备份<br />再也不怕数据丢失</h4>
  </div>
)

Forth.displayName = 'Forth'