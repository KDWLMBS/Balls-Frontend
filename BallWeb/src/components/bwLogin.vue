<template>
  <form @submit = "login">
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
     <button type="submit" @click="login" >Login</button>
   </div>
  </form>
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
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(res)
        this.$router.go('/')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
