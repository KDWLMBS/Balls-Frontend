<template>
  <div class="bwLogin">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        light
        label="E-mail"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        dark
        label="Password"
        v-model="password"
        type='password'
        required
      ></v-text-field>
      <v-btn
        @click="submit"
        :disabled="!valid"
      >
        login
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    password: '',
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(res => {
          console.log(res)
          if (res) this.$router.push('/')
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div.bwLogin {
  margin: 5em auto; 
  width: 50vw;
  background: rgba(255,255,255,0.75);
  border-radius: 0.2em;
  
  > * {
    padding: 1em;
  }
}
</style>
