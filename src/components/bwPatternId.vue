<template>
  <div class="bwPatternId">
    <div class="pattern" v-if="pattern">
      <h1>{{pattern.name}}</h1>
      <h4>{{pattern._id}}</h4>
      <div class="pages" v-if="pages">
        <span class="control" @click="decrement">&lt;</span>
        <span v-for="(page, index) of pages" :key="index" :class="{active: page===current}" @click="current=page">{{ page }}</span>
        <span class="control" @click="increment">&gt;</span>
        <span class="control new" @click="newFrame">+</span>
      </div>
      <div class="frame">
        <input type="range" orient="vertical" min="-100" max="100" v-for="(pos, index) in pattern.frames[current].positions" :key="index" v-model="pattern.frames[current].positions[index]" />
      </div>
      <div class="simulation">
        <bw-simulation type="Pattern" :model="pattern" :current="displayIndex" :play="play" />
      </div>
      <button @click="submit">Save</button>
    </div>
  </div>
</template>

<script>
import bwSimulation from '@/components/bwSimulation'
import patternService from '../api/pattern'

export default {
  data () {
    return {
      pattern: {},
      current: null,
      pages: [],
      play: false,
      now: 0,
      displayIndex: null
    }
  },
  watch: {
    current: function (val) {
      this.detect(val)
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    patternService.readOne({_id: this.id}).then(res => {
      console.log(`pattern`, res)
      this.pattern = res
      this.current = 0
      this.displayIndex = 0
    })
  },
  methods: {
    increment () {
      if (this.current + 1 < this.pattern.frames.length) this.current++
    },
    decrement () {
      if (this.current - 1 >= 0) this.current--
    },
    detect (idx) {
      this.pages.splice(0, this.pages.length)

      // const range = Math.min(this.pattern.frames.length, 10)
      // const overflow = range - Math.abs(this.current - this.pattern.frames.length)
      // const start = Math.max(0, this.current - (overflow))
      // const end = Math.min(this.pattern.frames.length, start + range)

      const fLen = this.pattern.frames.length
      const range = Math.min(fLen, 10)
      const overflow = range - Math.abs(idx - fLen)
      const remaining = range - Math.abs(idx - 0)
      const start = Math.max(0, idx - remaining - overflow)
      const end = Math.min(fLen, start + range)

      for (let i = start; i < end; i++) {
        this.pages.push(i)
      }

      // const diff = Math.abs(this.current - start)
      // const rem = range - diff
      // const max = Math.min(this.pattern.frames.length, this.current + rem)

      // for (let i = start; i < max; i++) {
      //   console.log(i)
      //   this.pages.push(i)
      // }

      // < 0 1 2 [3] 4 5 6 7 8 9 > (10 11 12 13 14)
      // range = min(length, 10)
      // offset = abs(0, idx) % (range /  2)
      //
    },
    newFrame (e) {
      let frame = { duration: 1, positions: [] }
      for (let i = 0; i < 30; i++) {
        frame.positions.push(100 - Math.random(1) * 200)
      }
      this.pattern.frames.push(frame)
      this.current = this.pattern.frames.indexOf(frame)
    },
    submit (e) {
      patternService.update(this.pattern)
        .then(res => {
          console.log(res)
        })
      e.preventDefault()
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (this.pattern && this.play) {
        const newDate = Date.now()
        if (this.now + 500 < newDate) {
          this.displayIndex = this.displayIndex + 1 < this.pattern.frames.length ? this.displayIndex + 1 : 0
        }
      }
    })
  },
  components: { bwSimulation }
}
</script>

<style lang="scss" scoped>
div.bwPatternId {
  > div.pattern {
    text-align: center;
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

        &.control {
          background: rgba(0,0,0,0.5);
          color: rgba(255,255,255,0.75);
        }
        &.new {
          background: rgba(50, 200, 50, 0.5);
          color: rgba(0,0,0,0.5);
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
