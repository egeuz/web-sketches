/*** INITIAL VARIABLES ***/
const resolution = 20;
const rows = 40;
const columns = 40;
let isometricAngle = 3;
const x = window.innerWidth / 2;
const y = window.innerHeight / 2;
let grid;
let skylines;

/*** RUNTIME ***/
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  frameRate(10);

  //initialize and render the grid;
  grid = new Grid({
    x, y, columns, rows, resolution, isometricAngle
  })
  grid.init();
  grid.render();

  skylines = generateSkyline(10, 10);
}

function draw() {
  background(0);
  grid.render();
  noStroke();

  skylines.forEach(skyline => {
    skyline.forEach(building => {
      let height = Math.max(Math.floor(random(3, 10)), Math.floor(random(3, 10)));
      building.h = height;
      building.render();
    })
  })
  renderSkyline();
}

function mouseWheel(event) {
  renderSkyline();

  clear();
  if (event.delta > 0) {
    isometricAngle += 0.1;
    grid.setIsometricAngle(isometricAngle);
  } else if (event.delta < 0) {
    isometricAngle -= 0.1;
    if (isometricAngle < 2) isometricAngle = 2;
    grid.setIsometricAngle(isometricAngle);
  }
}

function generateSkyline(startx, starty) {
  let columns = [];
  //making the weirdest loop i'll make in my life, so skippy.
  for (let x = startx; x < grid.cols - 4; x++) {
    let skyline = [];
    let width = Math.max(Math.floor(random(3, 5)), Math.floor(random(3, 5)));
    if (width > grid.cols - x)
      width = grid.cols - x

    for (let y = starty; y < grid.rows - 4; y++) {
      let depth = Math.max(Math.floor(random(3, 4)), Math.floor(random(3, 4)));
      if (depth > grid.rows - y)
        depth = grid.rows - y;
      let height = Math.max(Math.floor(random(3, 10)), Math.floor(random(3, 10)));

      let building = new RectPrism({
        point: createVector(x, y),
        width,
        depth,
        height,
        baseColor: { hue: random(90, 100), saturation: 60, brightness: 70 },
      })

      skyline.push(building);
      y += depth;
    }

    columns.push(skyline);
    x += width;
  }
  return columns;
}

function renderSkyline() {
  skylines.forEach((skyline, index) => {
    skyline.forEach(building => {
      building.render();
    })
  })
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

    /* future coloring properties */
    let hue = baseColor.hue;
    let sat = baseColor.saturation;
    let bri = baseColor.brightness;
    this.baseColor = color(hue, sat, bri);
    this.highlight = color(hue, sat - 10, bri + 10);
    this.shadow = color(hue, sat + 10, bri - 15);
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
    fill(this.baseColor);
    this.drawPlane(t1, t2, t3, t4); //draw top plane
    fill(this.highlight);
    this.drawPlane(t4, t3, b3, b4); //draw left side plane
    fill(this.shadow);
    this.drawPlane(t3, t2, b2, b3); //draw right side plane
  }

  getPlanePoints(x, y, w, d) {
    // console.log(x);
    // console.log(this.grid[x][y]);
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
        stroke(30, 60, 70);
        strokeWeight(x * 0.075 + y * 0.075);
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
    this.render();
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
