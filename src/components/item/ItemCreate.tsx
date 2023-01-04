import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    }
  },
  setup(props, context) {
    const kind = ref('支出');
    const onUpdateSelected = (name: string) => {
      kind.value = name
    }
    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name='back' class={s.navIcon}/>,
          default: () => <>
          <Tabs v-model:selected={kind.value}>
            <Tab name="支出">
              icon 列表
            </Tab>
            <Tab name="收入">
              icon 列表2
            </Tab>
          </Tabs>
        </>
        }  
      }</MainLayout>
    )
  }
})