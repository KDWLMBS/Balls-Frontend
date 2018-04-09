export default class Wall {
  constructor(p5, canvas, pattern) {
    this.p5 = p5
    this.c = canvas
    this.frames = pattern.frames
    this.sliders = [];
    this.current = 0;
  }

  update() {
    if (this.sliders.length === 0) {
      for (let i = 0; i < this.frames[this.current].positions.length; i++) {
        console.log(this.frames[this.current].positions[i])
        this.sliders[i] = this.frames[this.current].positions[i];
      }
      return;
    }

    for (let i = 0; i < this.sliders.length; i++) { 
      this.sliders[i] += (this.frames[this.current].positions[i] - this.sliders[i]) * 0.1;
    }
  }

  show() {
    const p = this.p5
    const c = this.c

    const padding = c.width * 0.025;
    const width = c.width - (padding * 2);
    const step = width / (this.sliders.length - 1);
    for (let i = 0; i < this.sliders.length; i++) {
      let x = padding + (step * i);
      p.line(x, 0, x, c.height);
      p.fill(0,0,0);
      // p.ellipse(x, c.height * (this.sliders[i] / 100), width / this.sliders.length, width / this.sliders.length);
      p.ellipse(x, 100 - this.sliders[i], width / this.sliders.length, width / this.sliders.length)
    }
  }

  draw() {
    this.update()
    this.show()
  }
}
