// import s from './Welcome.module.scss';

// export const First = () => (
//   <div class={s.card}>
//     <svg>
//       <use xlinkHref='#balance'></use>
//     </svg>
//     <h2>会挣钱<br />还要会省钱</h2>
//   </div>
// )

// First.displayName = 'First'
import { defineComponent, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useSwipe } from '../../hooks/useSwipe';
import s from './Welcome.module.scss';

export const First  = defineComponent({
 setup(props, context) {
  const div = ref<HTMLDivElement>()
  const router = useRouter()
  const { direction, swiping } = useSwipe(div, {
    beforeStart: e => e.preventDefault()
  })
  watchEffect(()=>{
    if(direction.value === 'left' && swiping.value ) {
      router.push('/welcome/2')
    }
  })
  return () => (
    <div class={s.card} ref={div}>
      <svg>
        <use xlinkHref='#balance'></use>
      </svg>
      <h2>会挣钱<br />还要会省钱</h2>
    </div>
  )
 }
})