<template>
  <div class="bw-simulation">
    <div ref="canvas"></div>
  </div>
</template>

<script>
import p5 from 'p5'

export default {
  data () {
    return {
      p5: null,
      canvas: null,
      circles: []
    }
  },
  mounted () {
    this.p5 = new p5((p) => {
      p.setup = () => {
        this.canvas = p.createCanvas(400, 400)
        this.canvas.parent(this.$refs.canvas)
        p.frameRate(60)
      }
      p.draw = () => {
        p.background(255)
        if (this.circles.length < 400) {
          this.circles.push({ x: p.random(400), y: p.random(400), r: p.random(20) })
        }
        for (let c of this.circles) {
          p.ellipse(c.x, c.y, c.r, c.r)
        }
      }
    })
  }
}
</script>
