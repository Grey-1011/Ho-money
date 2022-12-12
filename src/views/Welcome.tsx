import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

const Welcome = defineComponent({
 setup(props, context) {
  return () => (
    <div><RouterView/></div>
  )
 }
})