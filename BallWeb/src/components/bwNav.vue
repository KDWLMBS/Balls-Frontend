<template>
  <div>
    <h1>isLoggedIn: {{isLoggedIn}}</h1>
    <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
  </div>
</template>

<script>
export default {
  name: 'bw-nav',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
