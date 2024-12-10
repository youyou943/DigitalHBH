<template>
  <div ref="chart" style="width:6500px; height:400px;z-index: 2;background-color:rgb(243,238,220);position: absolute;left:0px;top:0px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'LargeAreaChart',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 获取图表的 DOM 元素
      const chartDom = this.$refs.chart;
      // 初始化 ECharts 实例
      const myChart = echarts.init(chartDom);

      // 配置图表选项
          let base = +new Date(1865, 0, 1);
      const end = +new Date(1955, 11, 31); // 1955年12月31日
      const oneDay = 24 * 3600 * 1000;
      const date = [];
          const data = [Math.random() * 300];
       const years = new Set(); // 使用 Set 去重，确保每年只记录一次
       // 生成年份和数据
  while (base <= end) {
    const now = new Date(base);
    const year = now.getFullYear();
    if (!years.has(year)) {
      years.add(year);
      date.push(year.toString()); // 只推入年份
    }
    data.push(Math.round((Math.random() - 0.5) * 20 + data[data.length - 1])); // 生成随机数据
    base += oneDay; // 时间增加一天
  }

      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        /*title: {
          left: 'center',
          text: 'Large Area Chart'
        },*/
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        /*dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10
          }
        ],*/
        series: [
          {
            name: '书法',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: data
          }
        ]
      };

      // 设置图表的选项
      myChart.setOption(option);

      // 监听窗口大小变化，自动调整图表大小
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped>
/* 可选样式 */
</style>
