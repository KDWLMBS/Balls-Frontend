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
        },
      ]
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
      }
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
div.bwAuth {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(255,255,255,0.75);
  margin: 10vh auto;
  max-height: 80vh;
  width: 90vw;
  border-radius: 0.2em;

  @media screen and (min-width: 720px) {
    width: 50vw;
  }

  > div.header {
    display: flex;
    flex-direction: row;
    background: rgba(255,255,255,0.75);
    > div.item {
      flex: 1;
      text-align: center;
      transition: 100ms;
      padding: 0.5em 0;
      font-size: 1.5em;
      &.active {
        background: rgba(0,0,0,0.5);
        color: rgba(255,255,255,0.75);
      }
      &:hover {
        background: rgba(0,0,0,0.75);
        color: rgba(255,255,255,0.75);
      }
    }
  }
  > form {
    display: flex;
    flex-direction: column;
    > input {
      flex: 1;
      padding: 1em 0.5em;
      border-style: none;
      &:last-child {
        background: rgba(0,0,0,0.5);
        color: rgba(255,255,255,0.75);
        &:hover {
          background: rgba(0,0,0,0.75);
          color: rgba(255,255,255,0.75);
        }
      }
    }
  }
}
</style>
