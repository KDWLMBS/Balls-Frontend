<template>
   <div>
     <h1>Login</h1>
     <br>
     <input
      type="email"
      name="email"
      v-model="email"
      placeholder="Email"/>
     <br>
     <input
      type="password"
      name="password"
      v-model="password"
      placeholder="Password"/>
     <br>
     <button @click="login">Login</button>
   </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''

    }
  },
  methods: {
    login () {
      this.$store.login('login', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
