const resolution = 10;
let ms;

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("canvas");
  ms = new MarchingSquares({
    width: width,
    height: height,
    resolution: resolution
  })
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  ms = new MarchingSquares({
    width: width,
    height: height,
    resolution: resolution
  })

}
function draw() {
  background("#111");
  ms.init();
}

/*** DOT VALUE SETTING MODES ***/
//these go into a 2D loop where x/y are points in the grid
const randomBinaryDots = () => Math.floor(random(2));
const noiseDots = (x, y) => noise(x * 0.1, y * 0.1, frameCount * 0.05)


class MarchingSquares {

  constructor({ width, height, resolution }) {
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.columns = Math.ceil(width / resolution + 1);
    this.rows = Math.ceil(height / resolution + 1);
    this.cornerValues = new Array(this.columns).fill(0).map(r => new Array(this.rows).fill(0));
  }

  init() {
    this.setDots(noiseDots);
    this.renderLines();
  }

  setDots(callback) {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.cornerValues[x][y] = callback(x, y);
      }
    }
  }

  renderBackground() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        const strokeVal = this.cornerValues[x][y] * 255;
        fill(strokeVal);
        noStroke();
        rect(x * this.resolution, y * this.resolution, this.resolution, this.resolution);
      }
    }
  }

  renderLines() {
    for (let x = 0; x < this.columns - 1; x++) {
      for (let y = 0; y < this.rows - 1; y++) {

        const corners = this.getCornerValues(x, y);
        const [a, b, c, d] = this.getIsolinePoints(x, y);
        // const [a, b, c, d] = this.getWeightedIsolinePoints(x, y, corners);
        const state = this.getSquareState(x, y);

        stroke(255);
        strokeWeight(1);

        switch (state) {
          case 1:
            this.drawLine(c, d);
            break;
          case 2:
            this.drawLine(b, c);
            break;
          case 3:
            this.drawLine(b, d);
            break;
          case 4:
            this.drawLine(a, b);
            break;
          case 5:
            this.drawLine(a, d);
            this.drawLine(b, c);
            break;
          case 6:
            this.drawLine(a, c);
            break;
          case 7:
            this.drawLine(a, d);
            break;
          case 8:
            this.drawLine(a, d);
            break;
          case 9:
            this.drawLine(a, c);
            break;
          case 10:
            this.drawLine(a, b);
            this.drawLine(c, d);
            break;
          case 11:
            this.drawLine(a, b);
            break;
          case 12:
            this.drawLine(b, d);
            break;
          case 13:
            this.drawLine(b, c);
            break;
          case 14:
            this.drawLine(c, d);
            break;
          default:
            break;
        }
      }
    }
  }

  drawLine(l1, l2) {
    line(l1.x, l1.y, l2.x, l2.y)
  }

  getIsolinePoints(x, y) {
    let res = this.resolution;
    return [
      createVector((x + 0.5) * res, y * res),
      createVector((x + 1) * res, (y + 0.5) * res),
      createVector((x + 0.5) * res, (y + 1) * res),
      createVector(x * res, (y + 0.5) * res)
    ]
  }

  getWeightedIsolinePoints(x, y, corners) {
    let res = this.resolution;

    // let aoffset = corners[1] - corners[0]
    // let boffset = corners[2] - corners[1]
    // let coffset = corners[3] - corners[2]
    // let doffset = corners[0] - corners[3]
    console.log(aoffset)

    return [
      createVector((x + 0.5 + aoffset) * res, y * res),
      createVector((x + 1) * res, (y + 0.5 + boffset) * res),
      createVector((x + 0.5 + coffset) * res, (y + 1) * res),
      createVector(x * res, (y + 0.5 + doffset) * res)
    ]
  }

  getCornerValues(x, y) {
    return [
      this.cornerValues[x][y],
      this.cornerValues[x + 1][y],
      this.cornerValues[x + 1][y + 1],
      this.cornerValues[x][y + 1]
    ]
  }

  getSquareState(x, y) {
    let a = this.cornerValues[x][y] > 0.5 ? 1 : 0;
    let b = this.cornerValues[x + 1][y] > 0.5 ? 1 : 0;
    let c = this.cornerValues[x + 1][y + 1] > 0.5 ? 1 : 0;
    let d = this.cornerValues[x][y + 1] > 0.5 ? 1 : 0;
    return a * 8 + b * 4 + c * 2 + d * 1;
  }
}