import { defineComponent, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import s from './BackIcon.module.scss';
import { Icon } from './Icon';
export const BackIcon = defineComponent({
  setup(props, context) {
    const router = useRouter()
    const route = useRoute()
    const onClick = () => {
      const { return_to } = route.query
      if(return_to){
        router.push(return_to.toString())
      }
      router.back()
    }

    return () => (
      <Icon name="back" onClick={onClick}/>
    )
  }
})