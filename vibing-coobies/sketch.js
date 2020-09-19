/*** INITIAL VARIABLES ***/
const resolution = 8;
const rows = 100;
const columns = 100;
let isometricAngle = 4;
const x = window.innerWidth / 2;
const y = window.innerHeight / 2;
let grid;
let cluster;
let time = 0;

/*** RUNTIME ***/
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  frameRate(12);

  grid = new Grid({
    x, y, columns, rows, resolution, isometricAngle
  })
  grid.init();
  grid.render();

  // skylines = generateSkyline(10, 10);
  cluster = new CubeCluster(10, 10, grid);
  cluster.init();
  console.log(cluster.blocks);
}

function draw() {
  background("#050505");
  noStroke();
  cluster.render();
  cluster.animate();

  var n = noise(time);
  n = (n > 0.5) ? 0.05 : -0.05;
  isometricAngle += n;
  if (isometricAngle < 2.5) isometricAngle = 2.5 + Math.random() * 0.05;
  if (isometricAngle > 6) isometricAngle = 6 + Math.random() * 0.05;
  console.log(isometricAngle);
  grid.setIsometricAngle(isometricAngle);

  time += 0.05;
}

function mouseWheel(event) {
  clear();
  
  if (event.delta > 0) {
    isometricAngle += 0.1;
    grid.setIsometricAngle(isometricAngle);
  } else if (event.delta < 0) {
    isometricAngle -= 0.1;
    if (isometricAngle < 2) isometricAngle = 2;
    grid.setIsometricAngle(isometricAngle);
  }
  // grid.render();

  noStroke();
  cluster.render();

  
}

class CubeCluster {
  constructor(x, y, grid) {
    this.grid = grid;
    this.blocks = [];
    this.x = x;
    this.y = y;
  }

  init() {
    let startx = this.x;
    let starty = this.y;
    let grid = this.grid;
    let blocks = [];
    //making the weirdest loop i'll make in my life, so skippy.
    for (let x = startx; x < grid.cols - 4; x++) {
      let column = [];
      let width = randomHighBias(1, 3);
      if (width > grid.cols - x)
        width = grid.cols - x
  
      for (let y = starty; y < grid.rows - 4; y++) {
        let depth = randomHighBias(3, 4);
        if (depth > grid.rows - y)
          depth = grid.rows - y;
        let height = randomHighBias(3, 10);
  
        let block = new RectPrism({
          point: createVector(x, y),
          width,
          depth,
          height,
          baseColor: { hue: random(80, 100), saturation: 60 - x * 0.1 - y * 0.1, brightness: 55 + x * 0.3 + y * 0.3 },
        })
  
        column.push(block);
        y += depth;
      }
  
      blocks.push(column);
      x += width;
    }
    this.blocks = blocks;
  }

  render() {
    this.blocks.forEach(column => {
      column.forEach(block => {
        block.render();
      })
    })
  }

  animate() {
    this.blocks.forEach(column => {
      column.forEach(block => {
        let height = randomHighBias(3, 10);
        block.h = height;
      })
    })
  }
}

/*** CLASSES ***/
class RectPrism {
  constructor({ point, width, depth, height, baseColor }) {
    this.grid = grid.points;
    this.point = point;
    this.x = this.point.x;
    this.y = this.point.y;
    this.w = width;
    this.d = depth;
    this.h = height;

    let hue = baseColor.hue;
    let sat = baseColor.saturation;
    let bri = baseColor.brightness;
    this.baseColor = color(hue, sat, bri);
    this.highlight = color(hue, sat - 10, bri + 10);
    this.shadow = color(hue, sat, bri);
    this.outlineColor = color;
  }

  render() {
    /* GET IMPORTANT POINTS FROM THE GRID */
    const [b1, b2, b3, b4] = this.getPlanePoints(
      this.x, this.y, this.w, this.d
    );
    const [t1, t2, t3, t4] = this.getPlanePoints(
      this.x - this.h, this.y - this.h, this.w, this.d
    );

    //draw prism planes
    fill(this.shadow);
    this.drawPlane(t1, t2, t3, t4); //draw top plane
    fill(this.baseColor);
    this.drawPlane(t4, t3, b3, b4); //draw left side plane
    fill(this.highlight);
    this.drawPlane(t3, t2, b2, b3); //draw right side plane
  }

  getPlanePoints(x, y, w, d) {
    return [
      this.grid[x][y],
      this.grid[x + w][y],
      this.grid[x + w][y + d],
      this.grid[x][y + d]
    ]
  }

  drawPlane(p1, p2, p3, p4, color) {
    beginShape()
    vertex(p1.x, p1.y)
    vertex(p2.x, p2.y)
    vertex(p3.x, p3.y)
    vertex(p4.x, p4.y)
    endShape()
  }
}


class Grid {
  constructor({ x, y, columns, rows, resolution, mode = "isometric", isometricAngle = 3 }) {
    this.x = x;
    this.y = y;
    this.origin = createVector(x, y - rows / isometricAngle * resolution);
    this.cols = columns;
    this.rows = rows;
    this.res = resolution;
    this.mode = mode;
    this.isometricAngle = isometricAngle;
    this.points = new Array(rows).fill(0).map(() =>
      new Array(columns).fill(0)
    );
  }

  /* MAIN METHODS */
  init() {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.points[x][y] = (this.mode === "isometric") ?
          this.createIsometricPoint(x, y) :
          this.create2DPoint(x, y)
      }
    }
  }

  render() {
    
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        let h = random(80, 100);
        let s = 60 - x * 0.3;
        let b = 70 + x * 0.5;
        stroke(h, s, b);
        const p = this.points[x][y];
        point(p.x, p.y);
      }
    }
  }

  setIsometricAngle(n) {
    this.isometricAngle = n;
    let newY = this.y - this.rows / this.isometricAngle * this.res;
    this.origin = createVector(this.origin.x, newY);
    this.init();
    // this.render();
  }

  createIsometricPoint(x, y) {
    let xpos = (x - y) * this.res / 2 + this.origin.x;
    let ypos = (x + y) * this.res / this.isometricAngle + this.origin.y;
    return createVector(xpos, ypos);
  }

  create2DPoint(x, y) {
    let xpos = x * this.res + this.origin.x;
    let ypos = y * this.res + this.origin.y;
    return createVector(xpos, ypos);
  }
}

/*** RANDOM METHODS ***/
function randomHighBias(min, max) {
  return Math.floor(Math.max(random(min, max), random(min, max)))
}
