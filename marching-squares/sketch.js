const resolution = 20;
let ms1;
let ms2;
// const seed = Math.random() * 10;

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("canvas");
  ms1 = new MarchingSquares({
    width: width,
    height: height,
    resolution: resolution,
    strokeColor: "#FF7E6Baa"
  })
  ms2 = new MarchingSquares({
    width: width,
    height: height,
    resolution: resolution,
    strokeColor: "#A9F0D1aa"
  })
  ms3 = new MarchingSquares({
    width: width,
    height: height,
    resolution: resolution,
    strokeColor: "#39A9DBaa"
  })
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  ms1 = new MarchingSquares({
    width: width,
    height: height,
    resolution: resolution,
    strokeColor: "#FF7E6Baa"
  })
  ms2 = new MarchingSquares({
    width: width,
    height: height,
    resolution: resolution,
    strokeColor: "#A9F0D1aa"
  })
  ms3 = new MarchingSquares({
    width: width,
    height: height,
    resolution: resolution,
    strokeColor: "#39A9DBaa"
  })

}
function draw() {
  background("#1C2321");
  ms3.init();
  ms1.init();
  ms2.init();
  
}

/*** DOT VALUE SETTING MODES ***/
//these go into a 2D loop where x/y are points in the grid
const randomBinaryDots = () => Math.floor(random(2));
const noiseDots = (x, y, seed) => {
  return noise(seed + x * 0.2, seed + y * 0.2, seed + frameCount * 0.01)
}


class MarchingSquares {

  constructor({ width, height, resolution, strokeColor }) {
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.columns = Math.ceil(width / resolution + 1);
    this.rows = Math.ceil(height / resolution + 1);
    this.cornerValues = new Array(this.columns).fill(0).map(r => new Array(this.rows).fill(0));
    this.strokeColor = strokeColor;
    this.seed = random(10);
  }

  init() {
    this.setDots(noiseDots);
    // this.renderBackground();
    this.renderLines();
  }

  setDots(callback) {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.cornerValues[x][y] = callback(x, y, this.seed);
      }
    }
  }

  renderBackground() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        const val = this.cornerValues[x][y] * 255;
        // const fillVal = this.cornerValues[x][y] > 0.5 ? "#fff" : "#000";
        fill(color(150, val, 255));
        noStroke();
        rect(x * this.resolution, y * this.resolution, this.resolution, this.resolution);
      }
    }
  }

  // renderBlock() {
  //   for (let x = 0; x < this.columns - 1; x++) {
  //     for (let y = 0; y < this.rows - 1; y++) {
        
  //     }
  //   }
  // }

  renderLines() {
    for (let x = 0; x < this.columns - 1; x++) {
      for (let y = 0; y < this.rows - 1; y++) {

        const corners = this.getCornerValues(x, y);
        const [p, q, r, s] = this.getCornerPoints(x, y);
        const [a, b, c, d] = this.getIsolinePoints(x, y);
        // const [a, b, c, d] = this.getWeightedIsolinePoints(x, y, corners);
        const state = this.getSquareState(x, y);

        stroke(this.strokeColor);
        strokeWeight(9);

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

  drawBlock(p1, p2, p3, p4) {
    beginShape();
      vertex(p1.x, p1.y)
      vertex(p2.x, p2.y)
      vertex(p3.x, p3.y)
      vertex(p4.x, p4.y)
    endShape();
  }

  getCornerPoints(x, y) {
    let res = this.resolution;
    return [
      createVector(x * res, y * res),
      createVector(x + 1 * res, y * res),
      createVector(x + 1 * res, y + 1 * res),
      createVector(x * res, y + 1 * res)
    ]
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