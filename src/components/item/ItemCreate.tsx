import { AxiosError } from 'axios';
import { showDialog } from 'vant';
import { defineComponent, reactive, ref } from 'vue';
import { routerKey, useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';
export const ItemCreate = defineComponent({
  setup(props, context) {
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      happen_at: new Date().toISOString(),
      amount: 0,
    });

    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        showDialog({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n'),
        });
      }
      throw error;
    };
    const router = useRouter();

    const onSubmit = async () => {
      await http
        .post<Resource<Item>>('/items', formData,  { _mock: 'itemCreate' })
        .catch(onError);

      router.push('/items');
    };

    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={formData.kind} class={s.tabs}>
                  <Tab name="支出">
                    <Tags
                      kind="expenses"
                      key="expenses"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                  <Tab name="收入">
                    <Tags
                      kind="income"
                      key="income"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happen_at}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
