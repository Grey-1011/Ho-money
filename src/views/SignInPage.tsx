import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBool } from "../hooks/useBool";
import { MainLayout } from "../layouts/MainLayout";
import { BackIcon } from "../shared/BackIcon";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { http } from "../shared/Http";
import { Icon } from "../shared/Icon";
import { hasError, validate } from "../shared/validate";
import { useMeStore } from "../store/useMeStore";
import s from "./SignInPage.module.scss";
export const SignInPage = defineComponent({
  setup(props, context) {
    const meStore = useMeStore()

    const refValidationCode = ref<any>();
    const { ref:refDisabled, toggle, on: disabled, off: enable } = useBool(false);

    const formData = reactive({
      email: "",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const route = useRoute()
    const router = useRouter()

    
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      const newErrors = validate(formData, [
        { key: "email", type: "required", message: "必填" },
        {
          key: "email",
          type: "pattern",
          regex: /.+@.+/,
          message: "非有效邮箱",
        },
        { key: "code", type: "required", message: "必填" },
      ]);
      Object.assign(errors, newErrors);

      if(!hasError(errors)){
        const response = await http.post<{jwt: string}>("/session", formData).catch(onError)
    
        localStorage.setItem('jwt', response.data.jwt);
        const returnTo = route.query.return_to?.toString()
        meStore.refreshMe()

        router.push(returnTo || '/')
      }
    };
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    };
    const onClickSendValidationCode = async () => {
      disabled()
      const response = await http
        .post("/validation_codes", { email: formData.email }, { _autoLoading: true })
        .catch(onError)
        .finally(enable);
      // 成功
      refValidationCode.value.startCountdown();
      // console.log(response);
    };

    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <BackIcon/>,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="logo" />
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder="请输入邮箱，然后点击发送验证码"
                  v-model={formData.email}
                  error={errors["email"]?.[0]}
                />
                <FormItem
                  ref={refValidationCode}
                  label="验证码"
                  type="validationCode"
                  placeholder="请输入六位数字"
                  disabled={refDisabled.value}
                  countForm={30}
                  onClick={onClickSendValidationCode}
                  v-model={formData.code}
                  error={errors["code"]?.[0]}
                />
                <FormItem style={{ paddingTop: "6em" }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});