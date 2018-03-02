<template>
  <ul>
    <li v-for="p in patterns" :key="p">{{p.name}}</li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      patterns: [
        { name: "adolf" },
        { name: "adolf" },
        { name: "wolfgang" },
      ],
      formulas: []
    }
  },
  computed: {
    patterns () {
      return api.getPatterns();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
