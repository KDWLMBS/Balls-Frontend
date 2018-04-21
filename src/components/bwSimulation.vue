<template>
  <div class="bwSimulation" ref="bwSimulation">
    <!-- <button @click="play = !play">Play</button>
    <button @click="reset">Reset</button> -->
    <div ref="canvas"></div>
  </div>
</template>

<script>
import P5 from 'p5'
import Wall from './wall'

export default {
  props: [ 'type', 'model', 'current', 'points', 'play' ],
  data () {
    return {
      p5: null,
      canvas: null,
      wall: null
    }
  },
  mounted () {
    this.p5 = new P5(p => {
      p.setup = () => {
        this.canvas = p.createCanvas(this.$refs.bwSimulation.clientWidth, 300)
        this.canvas.parent(this.$refs.canvas)
        p.frameRate(60)

        const data = {
          play: this.play,
          points: this.points
        }

        this.wall = new Wall(p, this.canvas, this.type, this.model, data)
      }
      p.draw = () => {
        p.clear()
        this.wall.draw()
      }
    })

    this.$nextTick(function () {
      window.addEventListener('resize', this.updateCanvas)
    })
  },
  methods: {
    updateCanvas (e) {
      this.p5.resizeCanvas(this.$refs.bwSimulation.clientWidth, 300)
      // replace height with this.$refs.bwSimulation.clientHeight and set height in css
    },
    reset (e) {
      this.wall.refresh()
    }
  },
  watch: {
    current (val) {
      this.wall.current = val
    },
    play (val) {
      this.wall.data.play = val
    },
    points (val) {
      if (this.wall) this.wall.refresh()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateCanvas)
  }
}
</script>
