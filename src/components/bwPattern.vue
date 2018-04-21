<template>
  <div class="bwPattern">
    <form @submit="submit">
      <bw-input v-for="(field, index) in fields" :key="index" :type="field.type" :placeholder="field.name" :options="field.options" v-model="field.value" />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import bwInput from '@/components/bwInput'
import patternService from '@/api/pattern'

export default {
  data () {
    return {
      fields: [
        { name: 'name', type: 'text' },
        { name: 'type', type: 'select', options: [ 'single', 'double' ] },
        { name: 'shift', type: 'select', subtype: 'boolean', options: [ 'true', 'false' ] },
        { name: 'shiftDirection', type: 'select', options: [ 'left', 'right' ] },
        { name: 'shiftDuration', type: 'number' }
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
          if (f.type === 'select') {
            if (f.subtype === 'boolean') {
              data[f.name] = !!f.value
            } else {
              data[f.name] = f.value.toUpperCase()
            }
          } else {
            data[f.name] = f.value
          }
        }
        data.frames = [{ duration: 1, positions: [] }]
        for (let i = 0; i < 30; i++) {
          data.frames[0].positions.push(100 - Math.random(1) * 200)
        }
        patternService.create(data)
          .then((res) => {
            this.$router.push({ path: `/pattern/${res.data._id}` })
          })
      }
      e.preventDefault()
    }
  },
  components: { bwInput }
}
</script>

<style lang="scss" scoped>
@import '../default';

div.bwPattern {
  > form {
    display: flex;
    flex-direction: column;
    > div.bwInput {
      margin-top: 0.25em;
      &:first-child {
        margin-top: 0;
      }
    }

    > input {
      flex: 1;
      padding: 1em 0.5em;
      border: 0;

      &:last-child {
        background: $primary-color;
        color: $text-color;
        &:hover {
          background: $hover-color;
          color: $text-color;
        }
      }
    }
  }
}
</style>
