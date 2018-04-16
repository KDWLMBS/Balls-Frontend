<template>
  <div class="bwFormulaId">
    <div class="formula" v-if="formula">
      <h1>{{formula.name}}</h1>
      <h4>{{formula._id}}</h4>
      <input type="text" :placeholder="formula.formula" v-model="formula.formula" />
      <div class="simulation">
        <bw-simulation :type="type" :model="formula" :points="points" :play="play" />
      </div>

      <button @click="submit">Save</button>
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
      formula: {},
      points: [],
      play: true
    }
  },
  watch: {
    'formula.formula': function () {
      const absX = Math.abs(this.formula.minX - this.formula.maxX)

      const len = 30
      try {
        this.points.splice(0, this.points.length)
        for (let i = 0; i < len; i++) {
          const calc = mathjs.eval(this.formula.formula, { x: this.formula.minX + i * (absX / len) })
          const num = Math.floor(100 * calc)
          this.points.push(num)
        }
        console.log(this.points)
      } catch (ex) {
        console.log(ex)
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
      formulaService.update(this.formula).then(res => {
        console.log(res)
      })
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
