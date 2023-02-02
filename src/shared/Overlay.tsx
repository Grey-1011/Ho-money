import { showDialog } from 'vant';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { http } from './Http';
import { Icon } from './Icon';
import { mePromise } from './me';
import s from './Overlay.module.scss';
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup(props, context) {
    const onClose = () => {
      props.onClose?.();
    };

    const onSignOut = async () => {
      await showDialog({
        title: '确认',
        message: '确定要退出登录吗？',
      });
      localStorage.removeItem('jwt');
    };

    const route = useRoute();
    const me = ref<User>();

    onMounted(async () => {
      const response = await mePromise;
      me.value = response?.data.resource;
      // console.log(response?.data.resource);
    });

    return () => (
      <>
        <div class={s.mask} onClick={onClose}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
              <div>
                <h2 class={s.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击这里退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/start" class={s.action}>
                  <Icon name="home" class={s.icon} />
                  <span>首页</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/items" class={s.action}>
                  <Icon name="bill" class={s.icon} />
                  <span>账单</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="statistics" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export_data" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/remind" class={s.action}>
                  <Icon name="remind" class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});

export const OverlayIcon = defineComponent({
  setup(props, context) {
    const overlayVisible = ref(false);
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    };

    return () => (
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu} />
        {overlayVisible.value && (
          <Overlay onClose={() => (overlayVisible.value = false)} />
        )}
      </>
    );
  },
});
