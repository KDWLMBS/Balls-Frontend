<template>
  <div class="bw-nav">
    <router-link to="/login" v-if="!isLoggedIn">
      <span>Login</span>
    </router-link>
    <router-link to="/register" v-if="!isLoggedIn">
      <span>Register</span>
    </router-link>
    <div v-if="isLoggedIn" @click="logout">
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
    </div>
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
<style lang="scss" scoped>
div.bw-nav {
  background: rgba(255,255,255,0.5);
  box-shadow: 0 0 1em black;

  display: flex;
  flex-direction: row;

  z-index: 5;

  > * {
    text-decoration: none;
    color: rgba(0,0,0,0.8);
    padding: 1em;

    &:hover {
      background: rgba(0,0,0,0.1);
    }
  }
}
</style>
