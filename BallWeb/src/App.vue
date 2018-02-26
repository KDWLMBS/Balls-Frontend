<template>
  <div id="app">
    <bw-nav></bw-nav>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import bwNav from '@/components/bwNav'

export default {
  name: 'App',
  components: {
    bwNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
