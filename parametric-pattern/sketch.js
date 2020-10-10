const w = 800;
const h = 400;
// const radius = 100;
// const rows = h / (radius * 0.5) + 1;
// const columns = w / radius + 1;
// const sides = 2;
// const rotation = Math.PI / 2;

let radius_slider,
  sides_slider,
  rotation_slider,
  color_picker;


function setup() {

  createCanvas(w, h)
  rectMode(CENTER)

  createP('Polygon Radius');
  radius_slider = createSlider(50, 400, 100)

  createP('Polygon Sides');
  sides_slider = createSlider(2, 12, 2)

  createP('Rotation');
  rotation_slider = createSlider(0, TWO_PI, Math.PI / 2)

  createP('Color');
  color_picker = createInput("#4EB745", "color")

  download_button = createButton('Download')
  download_button.mousePressed(() => {saveCanvas('pattern', 'png')})
}

function draw() {

  background("#111")
  noFill()
  stroke(color_picker.value())
  strokeWeight(1)

  drawPattern()
}

function drawPattern() {
  const sides = sides_slider.value()
  const radius = radius_slider.value();
  const rotation = rotation_slider.value()
  const rows = height / (radius * 0.5) + 1;
  const columns = width / radius + 1;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const xpos = (y % 2 === 0) ? x * radius : x * radius + radius / 2
      const ypos = y * radius / 2
      drawPolygon(xpos, ypos, sides, radius, rotation)
    }
  }
}

function drawPolygon(x, y, sides, radius, rotation) {
  if (sides > 2) {
    const angle = TWO_PI / sides;
    beginShape()
    for (let i = 0; i < TWO_PI; i += angle) {
      const vx = x + cos(i - rotation) * radius / 2;
      const vy = y + sin(i - rotation) * radius / 2;
      vertex(vx, vy)
    }
    endShape(CLOSE)
  } else {
    ellipse(x, y, radius, radius)
  }
}

function createPattern() {
  const pattern = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let xpos, ypos;

      xpos = (y % 2 === 0) ? x * radius : x * radius + radius / 2
      ypos = y * radius / 2

      let polygon = new Polygon(xpos, ypos, sides, radius);
      pattern.push(polygon);
    }
  }
  return pattern;
}

class Polygon {
  constructor(x, y, sides, radius) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.radius = radius;
    this.angle = TWO_PI / sides;
  }

  render() {

    if (this.sides > 2) {
      beginShape()
      for (let i = 0; i < TWO_PI; i += this.angle) {
        let x = this.x + cos(i - rotation) * this.radius / 2;
        let y = this.y + sin(i - rotation) * this.radius / 2;
        vertex(x, y)
      }
      endShape(CLOSE)
    } else {
      ellipse(this.x, this.y, this.radius, this.radius)
    }
  }
}