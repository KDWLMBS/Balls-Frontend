export default class Wall {
  constructor (p5, canvas, type, model, data) {
    this.p5 = p5
    this.c = canvas
    this.type = type
    this.model = model
    this.data = data
    this.current = 0
    this.sliders = []
    this.now = Date.now()
  }

  draw () {
    switch (this.type) {
      case 'Pattern':
        pattern.update(this)
        pattern.show(this)
        break
      case 'Formula':
        formula.update(this)
        formula.show(this)
        break
    }
  }

  refresh () {
    this.sliders.splice(0, this.sliders.length)
  }
}

const pattern = {
  update: (wall) => {
    if (wall.sliders.length === 0) {
      for (let i = 0; i < wall.model.frames[wall.current].positions.length; i++) {
        wall.sliders[i] = wall.model.frames[wall.current].positions[i]
      }
      return
    }

    for (let i = 0; i < wall.sliders.length; i++) {
      wall.sliders[i] += (wall.model.frames[wall.current].positions[i] - wall.sliders[i]) * 0.1
    }
  },
  show: (wall) => {
    const p = wall.p5
    const c = wall.c

    const padding = c.width * 0.025
    const width = c.width - (padding * 2)
    const step = width / (wall.sliders.length - 1)
    for (let i = 0; i < wall.sliders.length; i++) {
      let x = padding + (step * i)
      let y = (c.height / 2) + (c.height * (wall.sliders[i] / 200)) * -1
      p.line(x, 0, x, c.height)
      // p.fill(0, 0, 0)
      p.ellipse(x, y, width / wall.sliders.length, width / wall.sliders.length)
    }
  }
}

const formula = {
  update: (wall) => {
    if (wall.sliders.length === 0) {
      for (let i = 0; i < wall.data.points.length; i++) {
        wall.sliders[i] = wall.data.points[i]
      }
      return
    }
    if (wall.data.play) {
      const newDate = Date.now()
      if (wall.now + 500 < newDate) {
        wall.now = Date.now()
        for (let i = 0; i < wall.data.points.length; i++) {
          const next = i + 1 < wall.data.points.length ? i + 1 : 0
          wall.data.points[i] = wall.data.points[next]
        }
      }
      for (let i = 0; i < wall.sliders.length; i++) {
        wall.sliders[i] += (wall.data.points[i] - wall.sliders[i]) * 0.1
      }
    }
  },
  show: (wall) => {
    const p = wall.p5
    const c = wall.c
    const points = wall.sliders

    if (!p || !c || !points) return

    const padding = c.width * 0.025
    const width = c.width - (padding * 2)
    const step = width / (points.length - 1)
    for (let i = 0; i < points.length; i++) {
      let x = padding + (step * i)
      const y = c.height / 2 + points[i]
      p.line(x, 0, x, c.height)
      // p.fill(0, 0, 0)
      p.ellipse(x, y, width / points.length, width / points.length)
    }
  }
}
