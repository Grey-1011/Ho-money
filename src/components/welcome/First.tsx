import s from './Welcome.module.scss';
import icon from '../../assets/icons/balance.svg';

export const First = () => (
  <div class={s.card}>
    <img class={s.icon} src={icon}/>
    <h2>会挣钱<br />还要会省钱</h2>
  </div>
)

First.displayName = 'First'