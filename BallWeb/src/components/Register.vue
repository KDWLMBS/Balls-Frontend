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
     <button @click="signup">Register</button>
   </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''

    }
  },
  methods: {
    signup () {
      this.$store.dispatch('signup', {
        name: this.name,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.go('/')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
