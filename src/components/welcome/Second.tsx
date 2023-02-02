import s from './Welcome.module.scss';

export const Second = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#secondAd'></use>
    </svg>
    <h4>每日提醒<br />不遗漏每一笔账单</h4>
  </div>
)

Second.displayName = 'Second'