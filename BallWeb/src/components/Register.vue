<template>
   <div>
     <h1>Register</h1>
     <input
      type="name"
      name="name"
      v-model="name"
      placeholder="Name"/>
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
     <button @click="register">Register</button>
   </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''

    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        name: this.name,
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
