import s from './Welcome.module.scss';

export const Third = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#thirdAd'></use>
    </svg>
    <h4>数据可视化<br />收支一目了然</h4>
  </div>
)

Third.displayName = 'Third'