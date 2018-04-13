<template>
  <div class="bwSimulation" ref="bwSimulation">
    <div ref="canvas"></div>
  </div>
</template>

<script>
import P5 from 'p5'
import Wall from './wall'

export default {
  props: [ 'type', 'model', 'current', 'play' ],
  data () {
    return {
      p5: null,
      canvas: null,
      wall: null
    }
  },
  mounted () {
    console.log(this)
    this.p5 = new P5(p => {
      p.setup = () => {
        this.canvas = p.createCanvas(this.$refs.bwSimulation.clientWidth, 300)
        this.canvas.parent(this.$refs.canvas)
        p.frameRate(60)

        this.wall = new Wall(p, this.canvas, this.type, this.model)
      }
      p.draw = () => {
        p.background(255)

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
    }
  },
  watch: {
    current (val) {
      console.log(val)
      if (!this.play) this.wall.current = val
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateCanvas)
  }
}
</script>
