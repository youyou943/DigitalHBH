<template>
 
  <div>
      <LargeAreaChart />
  
    <div class="timeline-flex-container">
    <Timeline :startYear="1865" :endYear="1957" :width="6500" :height="300" />
  </div>

  <div class="container">
    <div class="header">中国大事记</div>
    <div class="section">
    <div class="grid">
      <div class="subheader">艺术</div>
      <div v-for="(item, index) in items" :key="index" class="grid-item" @click="handleClick(item)">{{ item }}</div>
    </div>
    <div class="grid">
      <div class="subheader">史事</div>
      <div v-for="(item, index) in items" :key="index" class="grid-item">{{ item }}</div>
    </div>
    </div>
    
  </div>

  <div class="container2">
    <div class="header2">欧洲大事记</div>
    <div class="section2">
    <div class="grid2">
      <div class="subheader2">艺术</div>
      <div v-for="(item, index) in items" :key="index" class="grid-item2" @click="handleClick(item)">{{ item }}</div>
    </div>
    <div class="grid2">
      <div class="subheader2">史事</div>
      <div v-for="(item, index) in items" :key="index" class="grid-item2">{{ item }}</div>
    </div>
    </div>   
  </div>

  </div>
</template>

<script>
import Timeline from "@/components/Timeline.vue";
import LargeAreaChart from '@/components/LargeAreaChart.vue';
export default {
  components: {
    Timeline,
    LargeAreaChart,
  },
  data() {
    return {
        items: [
        '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生','文徵明书《后赤壁赋》', '冯从吾生',
      ]    }
  },
   methods: {
    handleClick(item) {
      console.log("点击了", item);
      // 根据需求跳转到其他页面或执行其他操作
    },
  },
};
</script>

<style >

html, body {
  background-color: rgb(243,238,220);  /* 设置整个页面背景颜色 */
  height: 100%;
  width:100%;
   margin: 0;    /* 移除默认的边距 */
}

.timeline-flex-container {

  position: absolute;
  transform: translate(-14%, -30%);
  display: flex;
  justify-content: flex-start; /* 向左对齐 */
  align-items: center; /* 可选：垂直居中对齐 */
}

.container {
  position: absolute;
  display: flex;
  justify-content: flex-start; /* 向左对齐 */
  align-items: center; /* 可选：垂直居中对齐 */
  width: 6500px;
   height: 1000px; /* 设置更大的高度 */
  transform: translate(-14%, -9%);
  flex-direction: row;
}
.container2 {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* 向左对齐 */
  align-items: center; /* 可选：垂直居中对齐 */
  width: 6500px;
  height: 1000px; /* 设置更大的高度 */
  transform: translate(-14%, 34%);

}

.timeline {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.timeline-item {
  background-color: #f0f0f0;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.header{
  width: 156px;
  background-color:rgb(228, 221, 195);
  text-align: center;
  font-size: 38px; 
  font-family: "KaiTi", "楷体", serif; /* 设置为楷书字体 */
  padding: 0;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  height: 440px; /* 设置固定高度 */
  margin-top: 80px;
}

.header2{
  width: 156px;
  background-color:rgb(201, 202, 210);
  text-align: center;
  font-size: 38px; 
  font-family: "KaiTi", "楷体", serif; /* 设置为楷书字体 */
  padding: 0;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  height: 440px; /* 设置固定高度 */
  margin-top: 80px;
}
.subheader{
background-color:rgb(228, 221, 195);
font-size: 30px;
font-family: "KaiTi", "楷体", serif; 
text-align: center;
 writing-mode: vertical-rl;
}
.subheader2{
background-color:rgb(201, 202, 210);
font-size: 30px;
font-family: "KaiTi", "楷体", serif; 
text-align: center;
 writing-mode: vertical-rl;
}
.section {
  width: 100%;
  background-color:rgb(243,238,220);
  text-align: center;
  padding:0;
  margin-bottom: 10px;
  height: 350px; /* 设置固定高度 */
}
.section2 {
  width: 100%;
  background-color:rgb(207,207,213);
  text-align: center;
  padding:0;
  margin-bottom: 10px;
  height: 350px; /* 设置固定高度 */
}
.grid {
  display: grid;
  grid-template-columns: repeat(91, 1fr); /* 根据需要调整列数 */
  gap: 0; /* 确保列之间没有间隙 */
}
.grid2 {
  display: grid;
  grid-template-columns: repeat(91, 1fr); /* 根据需要调整列数 */
  gap: 0; /* 确保列之间没有间隙 */
}
.grid-item {
  background-color:rgb(243,238,220);
  padding: 10px;
  text-align: center;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  font-size: 20px;
  font-family: "KaiTi", "楷体", serif; 
  font-weight: bold;
}
.grid-item2 {
  background-color:rgb(207,207,213);
  padding: 10px;
  text-align: center;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  font-size: 20px;
  font-family: "KaiTi", "楷体", serif; 
  font-weight: bold;
}

.charts{
   position: absolute;
  display: flex;
  width: 6500px;
  height: 1000px; /* 设置更大的高度 */
  transform: translate(-14%, -14.5%);
}
</style>
