import { Overlay, showToast, Toast } from 'vant';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { Form, FormItem } from '../shared/Form';
import { OverlayIcon } from '../shared/Overlay';
import { Tab, Tabs } from '../shared/Tabs';
import { Time } from '../shared/time';
import s from './TimeTabsLayout.module.scss';
import { MainLayout } from './MainLayout';
import { ItemSummary } from '../components/item/ItemSummary';

// TODO Object as PropType<typeof demo> is not working
// const demo = defineComponent({
//   props: {
//     startDate: {
//       type: String as PropType<string>,
//       required: true
//     },
//     endDate: {
//       type: String as PropType<string>,
//       required: true
//     }
//   },
// })
export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof ItemSummary>,
      required: true
    },
    rerenderOnSwitchTab: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    hideThisYear: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, context) {
    const refSelected = ref('本月')
    const time = new Time();

    const tempTime = reactive({
      start: time.format(),
      end: time.format()
    })

    const customTime = reactive<{
      start?: string,
      end?: string
    }>({})
    
    const timeList = [
      { start: time.firstDayOfMonth(), end: time.lastDayOfMonth() },
      { start: time.add(-1, 'month').firstDayOfMonth(), end: time.add(-1, 'month').lastDayOfMonth() },
      { start: time.firstDayOfYear(), end: time.lastDayOfYear() }
    ]
    
    const refOverlayVisible = ref(false)

    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      if(new Date(tempTime.start) > new Date(tempTime.end)) {
        return showToast('开始时间不能大于结束时间')
      }
      Object.assign(customTime, tempTime)
      refOverlayVisible.value = false
    }
    const onCancelCustomTime = () => {
      refOverlayVisible.value = false
    }

    const onSelect = (value: string) => {
      if(value === '自定义时间') {
        refOverlayVisible.value = true
      }
    }

    return () => (
      <MainLayout>{
       {
        titie: () => 'H',
        icon: () => <OverlayIcon />,
        default: () => <>
          {props.hideThisYear ?
            <Tabs rerenderOnSelectedChange={props.rerenderOnSwitchTab} classPrefix={'customTabs'} v-model:selected={refSelected.value}
            onUpdate:selected={ onSelect }
          >
              <Tab value='本月' name='本月'>
                <props.component startDate={ timeList[0].start.format() } endDate={ timeList[0].end.format() }/>
              </Tab>
              <Tab value='上月' name='上月'>
                <props.component startDate={ timeList[1].start.format() } endDate={ timeList[1].end.format() }/>
              </Tab>
              <Tab value='自定义时间' name='自定义时间'>
                <props.component startDate={ customTime.start } endDate={ customTime.end }/>
              </Tab>
            </Tabs>
          :
          <Tabs rerenderOnSelectedChange={props.rerenderOnSwitchTab} classPrefix={'customTabs'} v-model:selected={refSelected.value}
          onUpdate:selected={ onSelect }
        >
            <Tab value='本月' name='本月'>
              <props.component startDate={ timeList[0].start.format() } endDate={ timeList[0].end.format() }/>
            </Tab>
            <Tab value='上月' name='上月'>
              <props.component startDate={ timeList[1].start.format() } endDate={ timeList[1].end.format() }/>
            </Tab>
            <Tab value='今年' name='今年'>
              <props.component startDate={ timeList[2].start.format() } endDate={ timeList[2].end.format() }/>
            </Tab>
            <Tab value='自定义时间' name='自定义时间'>
              <props.component startDate={ customTime.start } endDate={ customTime.end }/>
            </Tab>
          </Tabs>
          }
          <Overlay show={refOverlayVisible.value} class={s.overlay} >
            <div class={s.overlay_inner}>
              <header>
                请选择时间
              </header>
              <main>
                <Form onSubmit={onSubmitCustomTime}> 
                  <FormItem
                    label='开始时间'
                    type='date'
                    v-model={tempTime.start}
                  />
                  <FormItem
                    label='结束时间'
                    type='date'
                    v-model={tempTime.end}
                  />
                  <FormItem>
                    <div class={s.actions}>
                      <button type="button" onClick={onCancelCustomTime}>取消</button>
                      <button type="submit">确认</button>
                    </div>
                  </FormItem>
                </Form>
              </main>
            </div>
          </Overlay>
        </>
       } 
      }</MainLayout>
    )
  }
})