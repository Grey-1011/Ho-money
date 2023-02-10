import { showDialog } from 'vant';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useMeStore } from '../store/useMeStore';
import { Icon } from './Icon';
import s from './Overlay.module.scss';
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup(props, context) {
    const meStore = useMeStore()

    const onClose = () => {
      props.onClose?.();
    };

    const onSignOut = async () => {
      await showDialog({
        title: '确认',
        message: '确定要退出登录吗？',
      });
      localStorage.removeItem('jwt');
      window.location.reload() 
      if(route.path !== '/start') {
        router.push('/')
      }
    };

    const route = useRoute();
    const router = useRouter();
    const me = ref<User>();

    onMounted(async () => {
      const response = await meStore.mePromise;
      me.value = response?.data.resource;
      // console.log(response?.data.resource);
    });

    const refSelected = ref<number>()
    const linkArray = [
      { to: '/items/create', iconName: 'home', text: '开始记账' },
      { to: '/items', iconName: 'bill', text: '账单详情' },
      { to: '/statistics', iconName: 'statistics', text: '统计图表' },
      { to: '/export', iconName: 'export_data', text: '导出数据' },
      { to: '/remind', iconName: 'remind', text: '记账提醒' },
    ]
    onMounted(() => {
      const path = route.path
      switch (path) {
        case '/items/create':
          refSelected.value = 0
          break
        case '/items':
          refSelected.value = 1
          break
        case '/statistics':
          refSelected.value = 2
          break
        case '/export':
          refSelected.value = 3
          break
        case '/remind':
          refSelected.value = 4
          break
      }
    })

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
                {linkArray.map((link, index) => (
                    <RouterLink to={link.to} class={[s.action, index === refSelected.value ? s.selected : s.action]}>
                      <Icon name={link.iconName} class={s.icon} />
                      <span>{link.text}</span>
                    </RouterLink>
                  ))
                }
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
