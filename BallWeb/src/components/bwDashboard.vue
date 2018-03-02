<template>
  <ul>
    <!-- <li v-for="p in patterns" :key="p">{{p}}</li> -->
  </ul>
</template>

<script>
import patternService from '@/api/pattern'

export default {
  data () {
    return {
    }
  },
  computed: {
    async patterns () {
      return await this.patternService.readAll()
    }
  },
  activated () {
    this.$store.dispatch('loadPatterns')
  }
}
</script>

<style lang="scss" scoped>

</style>
