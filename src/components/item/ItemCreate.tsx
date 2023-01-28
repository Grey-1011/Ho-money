import { defineComponent, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';
export const ItemCreate = defineComponent({

  setup(props, context) {
    const kind = ref('支出');
  
    return () => (
      <MainLayout class={s.layout}>{
        {
          title: () => '记一笔',
          icon: () => <Icon name='back' class={s.navIcon}/>,
          default: () => <>
         <div class={s.wrapper}>
            <Tabs v-model:selected={kind.value} class={s.tabs}>
              <Tab name="支出">
                <Tags kind='expenses' key='expenses'/>
              </Tab>
              <Tab name="收入" >
                <Tags kind='income' key='income'/>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
          </div>
        </>
        }  
      }</MainLayout>
    )
  }
})