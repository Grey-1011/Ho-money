import { defineComponent, ref } from "vue";

export const App = defineComponent({
  setup() {
    return () => <>
      <header> 导航
        <ul>
          <li>
            <router-link to="/">Foo</router-link>
          </li>
          <li>
            <router-link to="/bar">Bar</router-link>
          </li>
        </ul>
      </header>
      <div>
        <routerView/>
      </div>
      <footer>
        页脚
      </footer>
    </>
  }
})