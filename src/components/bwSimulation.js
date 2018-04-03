let canvas;

let wall;
let interval;

function setup() {
  canvas = createCanvas(400, 400);
  wall = new Wall();

  for (let i = 0; i < 1000; i++) {
    let sliders = [];
    for (let s = 0; s < 60; s++) {
      sliders.push(random(500));
    }
    wall.add(sliders);
  }
  console.log(wall);

  interval = setInterval(() => {
    wall.current = wall.current + 1 < wall.frames.length ? wall.current + 1 : 0;
  }, 1000);
}

function draw() {
  background(222);

  wall.update();
  wall.show();
}

class Wall {
  constructor() {
    this.sliders = [];
    this.frames = [];
    this.current = 0;
  }

  add(frame) {
    this.frames.push(frame);
  }

  update() {
    if (this.sliders.length === 0) {
      for (let i = 0; i < this.frames[this.current].length; i++) {
        this.sliders[i] = this.frames[this.current][i];
      }
      return;
    }

    for (let i = 0; i < this.sliders.length; i++) { 
      this.sliders[i] += (this.frames[this.current][i] - this.sliders[i]) * 0.1;
    }
  }

  show() {
    const padding = canvas.width * 0.025;
    const width = canvas.width - (padding * 2);
    const step = width / (this.sliders.length - 1);
    for (let i = 0; i < this.sliders.length; i++) {
      let x = padding + (step * i);
      line(x, 0, x, canvas.height);
      fill(0,0,0);
      ellipse(x, canvas.height * (this.sliders[i] / 1000), width / this.sliders.length, width / this.sliders.length);
    }
  }
}
