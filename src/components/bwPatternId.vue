<template>
  <div class="bwPatternId">
    <h1>{{id}}</h1>
    <div v-if="pattern">
      <h2>{{pattern.name}}</h2>
      <v-pagination color="primary" :length="12" v-model="frame"></v-pagination>
    </div>
    <bw-simulation></bw-simulation>
  </div>
</template>

<script>
import bwSimulation from './bwSimulation'
import patternService from '../api/pattern'

export default {
  data () {
    return {
      frame: 0,
      pattern: {}
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    patternService.readOne({_id: this.id}).then(res => {
      this.pattern = res
      console.log(res)
    })
  },
  components: { bwSimulation }
}
</script>

<style lang="scss" scoped>
div.bwPatternId {
  background: rgba(255,255,255,0.75);
  margin: 5em auto;
  width: 90vw;
  border-radius: 0.2em;

  @media screen and (min-width: 720px) {
    width: 50vw;
  }

  > * {
    padding: 1em;
    text-align: center;
  }
}
</style>
