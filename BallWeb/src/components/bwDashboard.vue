<template>
<div class="bwDashboard">
  <ul>
    <!-- <li v-for="p in patterns" :key="p">{{p}}</li> -->
  </ul>
</div>
</template>

<script>
import patternService from '@/api/pattern'

export default {
  name: 'bwDashboard',
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
