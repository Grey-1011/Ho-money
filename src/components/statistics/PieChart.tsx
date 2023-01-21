import { defineComponent, onMounted, ref } from 'vue';
import s from './PieChart.module.scss';

import * as echarts from "echarts";
export const PieChart = defineComponent({

  setup(props, context) {
    onMounted(() => {
      // 基于准备好的dom，初始化echarts实例
      if (!refDiv2.value) return;
      var myChart = echarts.init(refDiv2.value);
      // 绘制图表
      myChart.setOption({
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        series: [
          {
            name: 'Access Form',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 40, name: 'rose 1' },
              { value: 33, name: 'rose 2' },
              { value: 28, name: 'rose 3' },
              { value: 22, name: 'rose 4' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
        ]
      });
    })
    const refDiv2 = ref<HTMLDivElement>();
    return () => (
      <div ref={refDiv2} class={s.wrapper}></div>
    )
  }
})