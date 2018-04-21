<template>
  <div class="bwFormulaId">
    <div class="formula" v-if="formula">
      <h4 style="text-align: center">Formula: {{formula.name}}</h4>
      <h5 style="text-align: center">{{formula._id}}</h5>
      <bw-input v-for="(ref, index) in inputs" :key="index" :type="ref.type" :placeholder="ref.var" v-model="formula[ref.var]" />
      <div class="simulation">
        <bw-simulation :type="type" :model="formula" :points="points" :play="play" />
      </div>

      <bw-input type="submit" @click="submit" />
    </div>
  </div>
</template>

<script>
import bwInput from '@/components/bwInput'
import bwSimulation from '@/components/bwSimulation'
import formulaService from '../api/formula'
import mathjs from 'mathjs'

export default {
  data () {
    return {
      type: 'Formula',
      formula: {},
      points: [],
      play: true,
      inputs: [
        { type: 'text', var: 'name' },
        { type: 'text', var: 'formula' },
        { type: 'text', var: 'minX' },
        { type: 'text', var: 'maxX' },
        { type: 'text', var: 'minY' },
        { type: 'text', var: 'maxY' }
      ]
    }
  },
  computed: {
    id () {
      return this.$route.params.id
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
      if (e) e.preventDefault()
    }
  },
  components: { bwSimulation, bwInput }
}
</script>

<style lang="scss" scoped>
@import '../default';

div.bwFormulaId {
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

  input {
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
</style>
