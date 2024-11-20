<template>
    <h3>首页</h3>
    <button  @click="goToWorksPage">作品</button>
    <button  @click="goToLifePage">生平</button>
    <button  @click="goToTrackPage">行迹</button>
    <button  @click="goToNetPage">交游</button>
</template>
<script>

export default {
  name: 'home',
  data() {
      return {
        
    };
  },
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