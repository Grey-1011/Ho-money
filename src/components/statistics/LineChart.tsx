import { defineComponent, onMounted, ref } from 'vue';
import s from './LineChart.module.scss';
import * as echarts from "echarts";

export const LineChart = defineComponent({

  setup(props, context) {
    onMounted(() => {
      // 基于准备好的dom，初始化echarts实例
      if (!refDiv.value) return;
      var myChart = echarts.init(refDiv.value);
      // 绘制图表
      myChart.setOption({
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      });
    });
    const refDiv = ref<HTMLDivElement>();
    return () => (
      <div ref={refDiv} class={s.wrapper}></div>
    )
  }
})