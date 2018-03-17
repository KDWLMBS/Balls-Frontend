<template>
  <div class="bwPatternId">
    <!-- Pagination which toggles between frames and calls bwFrame on one of them -->
  </div>
</template>

<script>
export default {
  computed: {
    id () {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


