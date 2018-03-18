<template>
  <div class="bwPattern">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Name"
        v-model="name"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>
      <v-text-field
        label="E-mail"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-select
        label="Item"
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        required
      ></v-select>
      <v-checkbox
        label="Do you agree?"
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        required
      ></v-checkbox>

      <v-btn
        @click="submit"
        :disabled="!valid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
import patternService from '@/api/pattern'

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        patternService.create({
          name: 'test',
          type: 'single',
          frames: [],
          shift: 0,
          shiftDirection: 'left',
          shiftDirection: 100
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
div.bwPattern {
  background: rgba(255,255,255,0.75);
  margin: 5em auto; 
  width: 90vw;
  border-radius: 0.2em;

  @media screen and (min-width: 720px) {
    width: 50vw;
  }

  > * {
    padding: 1em;
  }
}
</style>


