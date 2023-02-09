import { defineComponent } from 'vue';
import { BackIcon } from './BackIcon';
import { Center } from './Center';
import s from './ComingSoon.module.scss';
import { Icon } from './Icon';
import { Navbar } from './Navbar';
export const ComingSoon = defineComponent({
  setup(props, context) {
    return () => (
      <div>
        <Navbar>{
          {
            icon: () => <BackIcon />,
            default: () => 'under construction...'
          }
        }</Navbar>
        <Center class={s.logo_wrapper}>
          <Icon name='logo' class={s.logo}/>
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    )
  }
})

export default ComingSoon