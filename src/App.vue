<template>
  <div id="app">
    <router-view></router-view> <!-- 这是用于显示页面组件的地方 -->
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: rgb(243, 238, 220);
  height: 100%;
  min-height: 100%;
}

</style>