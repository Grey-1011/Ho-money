import s from './Welcome.module.scss';
import icon from '../../assets/icons/alarm.svg';

export const Second = () => (
  <div class={s.card}>
    <img class={s.icon} src={icon}/>
    <h2>每日提醒<br />不遗漏每一笔账单</h2>
  </div>
)

Second.displayName = 'Second'