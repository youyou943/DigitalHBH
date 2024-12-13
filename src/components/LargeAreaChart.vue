<template>
  <div ref="chart" style="width:6550px; height:300px;z-index: 3;background-color:rgb(243,238,220);position: absolute;left:-120px;top:0px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { API_BASE_URL } from '../config/api';  // 引入配置文件
import axios from 'axios';

export default {
  name: 'LargeAreaChart',
  data() {
    return {
      data1: [],
      data2:[],
    }
  },
  mounted() {
    this.initChart();
    this.fetchData();
    
  },
  methods: {
    fetchData() {
      axios.get('http://127.0.0.1:4523/m2/5614391-5293614-default/244359091')
        .then(response => {    
          console.log(response);
            
         
        })
        .catch(error => {
          console.error('Error fetching history:', error);
        });
    },
 
    initChart() {
      // 获取图表的 DOM 元素
      const chartDom = this.$refs.chart;
      // 初始化 ECharts 实例
      const myChart = echarts.init(chartDom);

      // 配置图表选项
      let base = +new Date(1865, 0, 1);
      const end = +new Date(1956, 11, 31); // 1955年12月31日
      const oneDay = 24 * 3600 * 1000;
      const date = [];

      const data1 = [Math.random() * 10];
      const data2 = [Math.random() * 10];

      const years = new Set(); // 使用 Set 去重，确保每年只记录一次
       // 生成年份和数据
   while (base <= end) {
    const now = new Date(base);
    const year = now.getFullYear();
    if (!years.has(year)) {
      years.add(year);
      date.push(year.toString()); // 只推入年份
    }
    // 生成 0-20 的随机数
    data1.push(Math.random() * 20);
    data2.push(Math.random() * 20);
    base += oneDay; // 时间增加一天
  }

      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        grid: {
        left: '4.2%', // 向右调整
        right: '1%', // 向左调整
        bottom: '10%', // 向上调整
        top: '10%' // 向下调整
      },
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
          data: date,
          axisLine: {
             lineStyle: {
              color: '#333', // 轴的颜色
             width:3 // 轴的宽度
            }
          },
         axisLabel: {
          fontSize: 18, // 刻度文字大小
           color: '#333', // 刻度文字颜色
          interval:0
          },
          splitLine: {
        show: true, // 显示分隔线
        lineStyle: {
          color: 'rgb(215,207,184)' // 修改条纹颜色为浅灰色
        }
          },
          axisTick: {
      interval: 0, // 每个刻度都显示
      length: 5 // 控制刻度线的长度
    }
      
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
           axisLine: {
        lineStyle: {
          color: '#333', // 轴的颜色
          width: 1 // 轴的宽度
        }
      },
      axisLabel: {
        fontSize: 18, // 刻度文字大小
        color: '#333' // 刻度文字颜色
          },
      splitLine: {
        show: true, // 显示分隔线
        lineStyle: {
          color: 'rgb(215,207,184)' // 修改条纹颜色为浅灰色
        }
      }
        },
        series: [
          {
            name: '书法',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(161, 84, 131)'
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
            data: data1
          },
          {
        name: '绘画',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(70, 130, 180)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(135, 206, 250)'
            },
            {
              offset: 1,
              color: 'rgb(70, 130, 180)'
            }
          ])
        },
        data: data2
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
