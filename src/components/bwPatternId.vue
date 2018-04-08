<template>
  <div class="bwPatternId">
    <div class="pattern" v-if="pattern">
      <h1>{{pattern.name}}</h1>
      <h4>{{pattern._id}}</h4>
      <div class="pages">
        <span @click="decrement">&lt;</span>
        <span v-for="(page, index) in pages" :key="index" v-bind:class="{active: page===current}" @click="current=page">{{ page }}</span>
        <span @click="increment">&gt;</span>
      </div>
      <div class="frame">
        <input type="range" orient="vertical" v-for="(pos, index) in pattern.frames[current].positions" :key="index" v-model="pattern.frames[current].positions[index]" />

        <!-- <div class="input" v-for="(pos, index) in pattern.frames[current].positions" :key="index">
          <input type="range" orient="vertical" v-model="pattern.frames[current].positions[index]" />
        </div> -->
      </div>
      <button @click="submit">Save</button>
    </div>
  </div>
</template>

<script>
import bwSimulation from './bwSimulation'
import patternService from '../api/pattern'

export default {
  data () {
    return {
      current: 0,
      pattern: {},
      pages: []
    }
  },
  watch: {
    current: function (val) {
      console.log(val)
      this.detect()
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    patternService.readOne({_id: this.id}).then(res => {
      this.pattern = res
      console.log(res)
    })
    this.detect()
  },
  methods: {
    increment () {
      this.current += this.current + 1 < 30 ? 1 : 0
      // this.current += this.current + 1 < this.frames.length ? 1 : 0
    },
    decrement () {
      this.current -= this.current - 1 > 0 ? 1 : 0
    },
    detect () {
      this.pages.splice(0, this.pages.length)
      let frame = this.current > 5 ? this.current : 5
      frame = this.current < 25 ? this.current : 25
      for (let i = 0; i < 10; i++) {
        const num = frame - 5 + 1
        this.pages.push(frame - 5 + i)
      }
    },
    submit (e) {
      patternService.update(this.pattern)
        .then(res => {
          console.log(res)
        })
      e.preventDefault()
    }
  },
  components: { bwSimulation }
}
</script>

<style lang="scss" scoped>
div.bwPatternId {
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
    > div.pages {
      display: flex;
      flex-direction: row;
      background: rgba(255,255,255,0.75);
      margin: 0.5em 0;
      > span {
        flex: 1;
        font-size: 0.8em;
        padding: 0.5em;
        cursor: pointer;

        &:first-child, &:last-child {
          background: rgba(0,0,0,0.5);
          color: rgba(255,255,255,0.75);
        }
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
    > div.frame {
      display: flex;
      flex-direction: row;
      > input {
        flex: 1;
        &[type=range] {
          -webkit-appearance: none;
        }
        &[type=range]:focus {
          outline: none;
        }
        &[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 100%;
          cursor: pointer;
          background: rgba(255,255,255,0.75);
          border: 0.2px solid rgba(0,0,0,0.5);
        }
        &[type=range]::-webkit-slider-thumb {
          margin-left: -5%;
          border: 1px solid #000000;
          cursor: pointer;
          -webkit-appearance: none;
        }
        &[type=range][orient=vertical] {
          writing-mode: bt-lr; /* IE */
          -webkit-appearance: slider-vertical; /* WebKit */
          width: 100%;
          height: 20vh;
          overflow: hidden;
        }
      }
    //   input[type=range]:focus::-webkit-slider-runnable-track {
    //     background: #367ebd;
    //   }
    //   input[type=range]::-moz-range-track {
    //     width: 100%;
    //     height: 8.4px;
    //     cursor: pointer;
    //     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    //     background: #3071a9;
    //     border-radius: 1.3px;
    //     border: 0.2px solid #010101;
    //   }
    //   input[type=range]::-moz-range-thumb {
    //     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    //     border: 1px solid #000000;
    //     height: 36px;
    //     width: 16px;
    //     border-radius: 3px;
    //     background: #ffffff;
    //     cursor: pointer;
    //   }
    //   input[type=range]::-ms-track {
    //     width: 100%;
    //     height: 8.4px;
    //     cursor: pointer;
    //     background: transparent;
    //     border-color: transparent;
    //     border-width: 16px 0;
    //     color: transparent;
    //   }
    //   input[type=range]::-ms-fill-lower {
    //     background: #2a6495;
    //     border: 0.2px solid #010101;
    //     border-radius: 2.6px;
    //     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    //   }
    //   input[type=range]::-ms-fill-upper {
    //     background: #3071a9;
    //     border: 0.2px solid #010101;
    //     border-radius: 2.6px;
    //     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    //   }
    //   input[type=range]::-ms-thumb {
    //     box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    //     border: 1px solid #000000;
    //     height: 36px;
    //     width: 16px;
    //     border-radius: 3px;
    //     background: #ffffff;
    //     cursor: pointer;
    //   }
    //   input[type=range]:focus::-ms-fill-lower {
    //     background: #3071a9;
    //   }
    //   input[type=range]:focus::-ms-fill-upper {
    //     background: #367ebd;
    //   }
    }
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
