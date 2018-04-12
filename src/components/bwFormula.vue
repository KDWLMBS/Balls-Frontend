<template>
  <div class="bwPattern">
    <form @submit="submit">
      <input v-for="(field, index) in fields" :key="index" :type="field.type" :placeholder="field.name" v-model="field.value" />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import patternService from '@/api/pattern'

export default {
  data () {
    return {
      fields: [
        { name: 'name', type: 'text' }
        // { name: 'type', type: 'select', options: [ 'single', 'double' ], value: null },
        // { name: 'shift', type: 'radio', value: null },
        // { name: 'shiftDirection', type: 'select', options: [ 'left', 'right' ], value: null },
        // { name: 'shiftDuration', type: 'number', value: null },
      ],
      valid: () => {
        return true
      }
    }
  },

  methods: {
    submit (e) {
      if (this.valid()) {
        const data = {}
        for (let f of this.fields) {
          data[f.name] = f.value
        }
        data.frames = [{ duration: 1, positions: [] }]
        for (let i = 0; i < 30; i++) {
          data.frames[0].positions.push(Math.random(1) * 100)
        }
        patternService.create(data)
          .then((res) => {
            this.$router.push({ path: `/pattern/${res.data._id}` })
          })
      }
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
div.bwPattern {
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

  > form {
    display: flex;
    flex-direction: column;
    > input {
      flex: 1;
      padding: 1em 0.5em;
      border: 0;

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
