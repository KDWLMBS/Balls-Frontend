<template>
  <div class="bwFormula">
    <form @submit="submit">
      <bw-input v-for="(field, index) in fields" :key="index" :type="field.type" :placeholder="field.name" :options="field.options" v-model="field.value" />
      <bw-input type="submit" />
    </form>
  </div>
</template>

<script>
import bwInput from '@/components/bwInput'
import formulaService from '@/api/formula'

export default {
  data () {
    return {
      fields: [
        { name: 'name', type: 'text' },
        { name: 'formula', type: 'text' },
        { name: 'minX', type: 'number' },
        { name: 'maxX', type: 'number' },
        { name: 'minY', type: 'number' },
        { name: 'maxY', type: 'number' }
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
        data.points = [] // should be done on the server
        formulaService.create(data)
          .then((res) => {
            console.log(data)
            this.$router.push({ path: `/formula/${res.data._id}` })
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

div.bwFormula {
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
    }
  }
}
</style>
