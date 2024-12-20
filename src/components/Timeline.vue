<template>
  <div class="timeline-container">
    <!-- 使用 Vue 渲染时间轴的刻度 -->
    <svg  ref="timeline" :width="width" :height="height">
  <!-- 创建轴 -->
  <g ref="xAxis" :transform="`translate(0, ${height - 60})`">
    <!-- 主轴 -->
    <line 
      :x1="0" 
      :x2="width" 
      :y1="0" 
      :y2="0" 
      stroke="#000" 
      stroke-width="2" 
    />
  </g>

  <g v-if="scale">
        <!-- 绘制每个时间段 -->
        <g v-for="(period, index) in periods" :key="index">
          <rect
            :x="scale(period.startYear)"
            :width="scale(period.endYear) - scale(period.startYear)"
            :y="height-138"
            :height="80"
            :fill="index % 2 === 0 ? 'rgba(170, 192, 196, 0.5)' : 'rgba(190, 192, 171, 0.6)'"
          />
          <text
            :x="scale(period.startYear) + (scale(period.endYear) - scale(period.startYear)) / 2"
            :y="height - 110"
            text-anchor="middle"
            alignment-baseline="middle"
            font-size="20px"
            font-weight="bold"
            fill="#333"
            font-family="'SimSun', 'LiSu', '隶书', sans-serif"
          >
            {{ period.label }}
          </text>
        </g>
      </g>


     
</svg>

    <!-- 使用 Vue 渲染每个年份下的 div -->
    <div
      v-for="(year, index) in years"
      :key="year"
      :style="{ left: `${scale(year)}px`, position: 'absolute', bottom: '-18px', textAlign: 'center' }"
      class="year-div"
      @click="yearClick(year, index)"
    >
      <div class="extra-div" style="background-color: rgba(175, 180, 173, 0.5); padding: 5px;">
        <p>{{ Ayears[index] }}</p>
      </div>

        <!-- 圆形图标和年份文本 -->
      <svg v-if="activeYears.includes(year)" :x="scale(year) - 15" :y="height-60" width="200" height="200" style="position: absolute;z-index:999;top:-70;left:-40" @click="openTotal(year)">
        <!-- 圆形 -->
        <circle cx="50" cy="50" r="40" fill="#F2E7D6"  stroke="black" stroke-width="1" />
         <!-- 内圆形，添加内边框 -->
        <circle cx="50" cy="50" r="35" fill="none" stroke="#8a8a8a" stroke-width="2" />
        <!-- 文本 -->
        <text x="50" y="55" text-anchor="middle" alignment-baseline="middle" font-size="25" fill="#9E5633">
          {{ year-1865+1 }}岁
        </text>
      </svg>
    
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { ElDialog, ElButton } from 'element-plus';
import 'element-plus/dist/index.css';

export default {
  name: "Timeline",
  props: {
    startYear: {
      type: Number,
      default: 1865, // 设置起始年份为 1865
    },
    endYear: {
      type: Number,
      default: 1955, // 设置结束年份为 1955
    },
    width: {
      type: Number,
      default: 6500, // 增加宽度，使得刻度有足够的空间
    },
    height: {
      type: Number,
      default: 300, // 增加高度
    },
  },
  data() {
    return {
      years: [], // 用于存储刻度年份数据
      scale: null, // 存储比例尺
      Ayears:[
  '同治四年',
  '同治五年',
  '同治六年',
  '同治七年',
  '同治八年',
  '同治九年',
  '同治十年',
  '同治十一年',
  '同治十二年',
  '同治十三年',
  '光绪元年',
  '光绪二年',
  '光绪三年',
  '光绪四年',
  '光绪五年',
  '光绪六年',
  '光绪七年',
  '光绪八年',
  '光绪九年',
  '光绪十年',
  '光绪十一年',
  '光绪十二年',
  '光绪十三年',
  '光绪十四年',
  '光绪十五年',
  '光绪十六年',
  '光绪十七年',
  '光绪十八年',
  '光绪十九年',
  '光绪二十年',
  '光绪二十一年',
  '光绪二十二年',
  '光绪二十三年',
  '光绪二十四年',
  '光绪二十五年',
  '光绪二十六年',
  '光绪二十七年',
  '光绪二十八年',
  '光绪二十九年',
  '光绪三十年',
  '光绪三十一年',
  '光绪三十二年',
  '光绪三十三年',
  '光绪三十四年',
  '宣统元年',
  '宣统二年',
  '宣统三年',
  '民国元年',
  '民国二年',
  '民国三年',
  '民国四年',
  '民国五年',
  '民国六年',
  '民国七年',
  '民国八年',
  '民国九年',
  '民国十年',
  '民国十一年',
  '民国十二年',
  '民国十三年',
  '民国十四年',
  '民国十五年',
  '民国十六年',
  '民国十七年',
  '民国十八年',
  '民国十九',
  '民国二十年',
  '民国二十一年',
  '民国二十二年',
  '民国二十三年',
  '民国二十四年',
  '民国二十五年',
  '民国二十六年',
  '民国二十七年',
  '民国二十八年',
  '民国二十九年',
  '民国三十年',
  '民国三十一年',
  '民国三十二年',
  '民国三十三年',
  '民国三十四年',
  '民国三十五年',
  '民国三十六年',
  '民国三十七年',
  '新中国元年',
  '新中国二年',
  '新中国三年',
  '新中国四年',
  '新中国五年',
  '新中国六年',
  '新中国七年',
  '新中国八年',
      ],
      periods: [
         { label: '同治', startYear: 1865, endYear: 1875 },
         { label: '光绪', startYear: 1875, endYear: 1909 },
         { label: '宣统', startYear: 1909, endYear: 1912 },
         { label: '民国', startYear: 1912, endYear: 1949 },
         { label: '新中国', startYear: 1949, endYear: 1957 }
        ],
      activeYears: [],  // 存储已点击的年份
    };
  },
  mounted() {
    this.drawTimeline();
    console.log("Scale after initialization: ", this.scale);  // 检查 scale 初始化情况
  },
  methods: {
    yearClick(year) {
      // 切换当前年份是否存在于activeYears数组中
      if (this.activeYears.includes(year)) {
        this.activeYears = this.activeYears.filter(y => y !== year);  // 如果已经显示则移除
      } else {
        this.activeYears.push(year);  // 否则添加
      }
    },
    openTotal(year) {
      console.log("打开");
       this.$router.push({ name: 'life', query: { year: year } });
    },
    drawTimeline() {
      // 创建比例尺
      const xScale = d3
        .scaleLinear()
        .domain([this.startYear, this.endYear]) // 设置起始年份和结束年份的范围
        .range([225, this.width]);


       // 存储比例尺，以便后续用于计算 div 的位置
      this.scale = xScale;

      // 生成年份数据
      this.years = d3.range(this.startYear, this.endYear); // 包含开始和结束年份

     

      // 创建并绘制顶部轴
      const xAxis = d3.axisTop(xScale)
        .ticks(this.endYear - this.startYear) // 每年显示一个刻度
        .tickSize(15) // 设置刻度线长度
        .tickFormat(d => `${d}`); // 在年份后添加 "年" 字样

      d3.select(this.$refs.xAxis).call(xAxis);

      // 调整字体大小
  d3.select(this.$refs.xAxis)
  .selectAll("text") // 选择所有刻度文字
  .style("font-size", "20px") // 设置字体大小
        .style("fill", "#333"); // 可选：设置文字颜色


         console.log(this.scale);
    },

   
  },
};
</script>

<style >
html, body {
  background-color:#E2DCCC;  /* 设置整个页面背景颜色 */
  height: 100%;
  width:100%;
   margin: 0;    /* 移除默认的边距 */
}
.timeline-container {
  background-color:#E2DCCC;
  position: relative; /* 使得所有子元素基于此容器定位 */
}

svg {
  border: none;
}

.year-div {
  /*background-color: rgba(0, 123, 255, 0.3);*/
  /*position: absolute;*/
  bottom: 0px; /* 距离底部一定的间隔，确保 div 不会遮挡刻度 */
  width: 60px;
  text-align: center;
  font-size: 15px;
  position: relative;
}

.year-label {
  font-weight: bold;
}

.extra-div {
  background-color: #AFB4AD; /* 设置额外内容背景颜色 */
  border-radius: 3px;
  font-size: 20px; /* 可以设置适合的字体大小 */
  font-family: "隶书", "SimLi", "PMingLiU", "標楷體", sans-serif; /* 设置繁体字体 */
  font-weight: bold; /* 设置字体加粗 */
  margin: 0; /* 去除间距 */
   padding: 0; /* 去除内边距左右，只保留上下间距 */
   width: 100%; /* 确保宽度填充 */
   display: flex; /* 确保它们紧密排列 */
    height: 75px; /* 设置固定高度 */
}

</style>
