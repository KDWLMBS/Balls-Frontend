<template>
  <div>
    <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <a href = "#" v-if="isLoggedIn" @click="logout">Logout</a>
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
