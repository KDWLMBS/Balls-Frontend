<template>
  <div class="bwAuth">
    <div class="header"> <!-- flex row -->
      <div class="item" v-bind:class="{active: cred===current}" v-for="(cred, index) in creds" :key="index" @click="current=cred">
        {{ cred.title }}
      </div>
    </div>
    <form @submit="submit">
      <input v-for="(field, index) in current.fields" :key="index" :type="field.type" :placeholder="field.name" v-model="field.value" />
      <input type="submit" />
    </form>
    <div class="message" v-if="message">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: {},
      creds: [
        {
          title: 'login',
          fields: [
            { name: 'email', type: 'text', value: '' },
            { name: 'password', type: 'password', value: '' }
          ],
          valid: function () {
            console.log('fields:', this.fields)
            for (let f of this.fields) {
              if (!f.value) return false
            }
            return true
          }
        },
        {
          title: 'signup',
          fields: [
            { name: 'email', type: 'text', value: '' },
            { name: 'name', type: 'text', value: '' },
            { name: 'password', type: 'password', value: '' }
          ],
          valid: function () {
            console.log('fields:', this.fields)
            for (let f of this.fields) {
              if (!f.value) return false
            }
            return true
          }
        }
      ],
      message: ''
    }
  },
  created () {
    this.current = this.creds[0]
  },
  methods: {
    submit (e) {
      console.log(this.current)
      if (this.current.valid()) {
        const data = {}
        for (let f of this.current.fields) {
          data[f.name] = f.value
        }
        this.$store.dispatch(this.current.title, data)
          .then(res => {
            console.log(res)
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
            this.message = err
          })
      }
      e.preventDefault()
    }
  },
  watch: {
    message () {
      setTimeout(() => {
        this.message = ''
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../default';

div.bwAuth {
  *:focus {
    outline: none;
  }

  > div.header {
    display: flex;
    flex-direction: row;
    background: $primary-color;
    > div.item {
      flex: 1;
      text-align: center;
      transition: 100ms;
      padding: 0.5em 0;
      background: $primary-color;
      color: $text-color;
      &:hover {
        background: $hover-color;
      }
      &.active {
        background: $active-color;
      }
    }
  }
  > form {
    display: flex;
    flex-direction: column;
    > input {
      flex: 1;
      border-style: none;
      padding: 0.5em;
      &:last-child {
        padding: 0.5em 0;
        font-size: 1em;
        background: $primary-color;
        color: $text-color;
        &:hover {
          background: $hover-color;
        }
        &.active {
          background: $active-color;
        }
      }
    }
  }
  > div.message {
    display: flex;
    justify-content: center;
    font-size: 1em;
    font-weight: lighter;
    background: rgba(255, 0, 0, 0.5);
    color: rgba(0,0,0,0.75);
    padding: 0.5em;
    border: 0;
  }
}
</style>
