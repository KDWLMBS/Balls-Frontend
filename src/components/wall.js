export default class Wall {
  constructor (p5, canvas, pattern) {
    this.p5 = p5
    this.c = canvas
    this.frames = pattern.frames
    this.sliders = []
    this.current = 0
  }

  update () {
    if (this.play) {
      if (this.counter) this.counter++
      else this.counter = 0
      if (this.counter > 60) {
        if (this.current + 1 < this.frames.length) this.current++
        else this.current = 0
      }
    }

    if (this.sliders.length === 0) {
      for (let i = 0; i < this.frames[this.current].positions.length; i++) {
        console.log(this.frames[this.current].positions[i])
        this.sliders[i] = this.frames[this.current].positions[i]
      }
      return
    }

    for (let i = 0; i < this.sliders.length; i++) {
      this.sliders[i] += (this.frames[this.current].positions[i] - this.sliders[i]) * 0.1
    }
  }

  show () {
    const p = this.p5
    const c = this.c

    const padding = c.width * 0.025
    const width = c.width - (padding * 2)
    const step = width / (this.sliders.length - 1)
    for (let i = 0; i < this.sliders.length; i++) {
      let x = padding + (step * i)
      p.line(x, 0, x, c.height)
      p.fill(0, 0, 0)
      p.ellipse(x, 150 - this.c.height * (this.sliders[i] / 200), width / this.sliders.length, width / this.sliders.length)
    }
  }

  draw () {
    this.update()
    this.show()
  }
}
