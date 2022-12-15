import s from './Welcome.module.scss';
import icon from '../../assets/icons/database.svg';

export const Third = () => (
  <div class={s.card}>
    <img class={s.icon} src={icon}/>
    <h2>数据可视化<br />收支一目了然</h2>
  </div>
)

Third.displayName = 'Third'