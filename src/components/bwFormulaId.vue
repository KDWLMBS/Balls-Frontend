<template>
  <div class="bwFormulaId">
    <div class="formula" v-if="formula">
      <h1>{{formula.name}}</h1>
      <h4>{{formula._id}}</h4>
      <input type="text" :placeholder="formula.formula" v-model="formula.formula" />
      <div class="simulation">
        <bw-simulation :formula="formula" :play="true" />
      </div>
      <!-- <button @click="submit">Save</button> -->
    </div>
  </div>
</template>

<script>
import bwSimulation from '@/components/bwSimulation'
import formulaService from '../api/formula'

export default {
  data () {
    return {
      formula: {}
    }
  },
  watch: {
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
