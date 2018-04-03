<template>
  <div id="app">
    <!-- <bw-nav></bw-nav> -->
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

<style lang="scss">
@import 'vuetify/dist/vuetify.min.css';

html, body {
  display: block;
  height: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom right, #3f95ea 0%, #52d3aa 100%);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 1vw;
    max-width: 7.5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    background: rgba(0,0,0,0.1);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    // background: rgba(255,255,255,0.8);
    background: rgba(0,0,0,0.5);
    border-radius: 0.1em;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: rgba(0,0,0,0.8);
  }
}
</style>
