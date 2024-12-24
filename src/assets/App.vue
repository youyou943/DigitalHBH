<template>
  <div class="app">
    <RelationshipGraph />
  </div>
</template>

<script setup>
import RelationshipGraph from './components/RelationshipGraph.vue'
</script>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

body {
  margin: 0;
  background-color: #f5f2eb;
  font-family: "Microsoft YaHei", Arial, sans-serif;
}
</style>
