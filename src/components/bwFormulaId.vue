<template>
  <div class="bwFormulaId">
    <div class="formula" v-if="formula">
      <h1>{{formula.name}}</h1>
      <h4>{{formula._id}}</h4>
      <input type="text" :placeholder="formula.formula" v-model="formula.formula" />
      <div class="simulation">
        <bw-simulation :type="type" :model="formula" :play="false" />
      </div>
      <!-- <button @click="submit">Save</button> -->
    </div>
  </div>
</template>

<script>
import bwSimulation from '@/components/bwSimulation'
import formulaService from '../api/formula'
import mathjs from 'mathjs'

export default {
  data () {
    return {
      type: 'Formula',
      formula: {}
    }
  },
  watch: {
    'formula.formula': function () {
      console.log('Formula changed')
      const absX = Math.abs(this.formula.minX - this.formula.maxX)
      const absY = Math.abs(this.formula.minY - this.formula.maxY)

      console.log(absX, absY)

      const len = 30
      for (let i = 0; i < len; i++) {
        try {
          const calc = mathjs.eval(this.formula.formula, { x: this.formula.minX + i * (absX / len) })
          console.log(calc)
          const num = Math.floor(100 * calc) // initial = ( 1000 * calc )
          this.formula.points.push(num)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    formulaService.readOne({_id: this.id}).then(res => {
      this.formula = res
      console.log(res)
    })
  },
  methods: {
    submit (e) {
      e.preventDefault()
    }
  },
  components: { bwSimulation }
}
</script>

<style lang="scss" scoped>
div.bwFormulaId {
  background: rgba(255,255,255,0.75);
  margin: 5em auto;
  width: 90vw;
  border-radius: 0.2em;

  @media screen and (min-width: 720px) {
    width: 50vw;
  }

  > * {
    padding: 1em;
    text-align: center;
  }

  > div.pattern {
    > button {
      width: 100%;
      border: none;
      background: rgba(0,0,0,0.5);
      color: rgba(255,255,255,0.75);
      cursor: pointer;

      &:hover {
        background: white;
        color: black;
      }
    }
  }
}
</style>
