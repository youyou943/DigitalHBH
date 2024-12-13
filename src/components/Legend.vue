<template>
  <div class="legend-container">
    <div class="legend-item">
      <div class="color-box calligraphy"></div>
      <span class="legend-text">书法</span>
    </div>
    <div class="legend-item">
      <div class="color-box painting"></div>
      <span class="legend-text">绘画</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legend'
}
</script>

<style scoped>
.legend-container {
  position: absolute;
  top: 50px;
  left: 20px;
  background-color: rgb(243,238,220);
  padding: 10px;
  border-radius: 4px;
  z-index: 3;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.color-box {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 2px;
}

.calligraphy {
  background-color: rgb(255, 70, 131);
}

.painting {
  background-color: rgb(0, 123, 255);
}

.legend-text {
  font-size: 14px;
  color: #333;
  font-family: "SimSun", "宋体", serif;
}
</style>