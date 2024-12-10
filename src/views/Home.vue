<template>
  <div class="exhibition-page">
    <div class="background">
      <div class="overlay">
        <h1 class="title">墨韵云间</h1>
        <p class="subtitle">数字黄宾虹</p>
        <div class="navigation">
          <el-dropdown placement="bottom-start">
      <el-button style="background-color: #fdf5e6;font-size: 20px; padding: 15px 40px;border-color: #fdf5e6;"> 观看 </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goToWorksPage">作品</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
     <el-dropdown placement="bottom-start">
      <el-button style="background-color: #fdf5e6;font-size: 20px; padding: 15px 40px;border-color: #fdf5e6;"> 探索 </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goToLifePage">生平</el-dropdown-item>
          <el-dropdown-item @click="goToTrackPage">行迹</el-dropdown-item>
          <el-dropdown-item @click="goToNetPage">交游</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
        </div>
         
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    goToWorksPage() {
      this.$router.push('/works');
    },
    goToLifePage() {
      this.$router.push('/life');
    },
    goToTrackPage() {
      this.$router.push('/track');
    },
    goToNetPage() {
      this.$router.push('/netWork');
    },
  },
};
</script>

<style scoped>
.exhibition-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family:  'SimSun', serif; /* 使用与古典书法风格一致的字体 */
  color: #f5e8c8; /* 仿古颜色 */
}

.background {
  flex: 1;
  background-image: url('public/bkimg.webp'); /* 背景书法纹理图 */
  position: fixed; /* 确保背景固定在视口内 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover; /* 确保背景图片覆盖整个屏幕 */
  background-position: top left; /* 背景图片与左上角对齐 */
  background-repeat: no-repeat; /* 防止背景图片重复 */

}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: rgba(0, 0, 0, 0.6); /* 半透明背景 */
  padding: 20px;
  border-radius: 10px;
   width: 100%; /* 增加宽度 */
  height: 40%; /* 增加高度 */
}

.title {
  font-size: 8em;
  margin: 0;
  font-weight: bold;
  font-family:  'LiSu', serif;
}

.subtitle {
  font-size: 4em;
  margin: 10px 0;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.navigation span {
  cursor: pointer;
  font-size: 1.2em;
  transition: color 0.3s;
}

.navigation span:hover {
  color: #ffd700; /* 鼠标悬停效果 */
}

</style>
