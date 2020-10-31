let pg;
let res = 150;

function setup() {
  createCanvas(windowWidth, windowHeight)
  pg = new PointGrid(res)
  pg.init()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  pg = new PointGrid(res)
  pg.init()
}

function draw() {
  background('#F9F5EB')
  noStroke()

  pg.render(coordinateCell)
  pg.update()
}

class PointGrid {
  constructor(res) {
    this.columns = Math.floor(width / res) + 1
    this.rows = Math.floor(height / res) + 1
    this.resolution = res

    this.grid = new Array(this.columns)
      .fill(0).map(() => {
        return new Array(this.rows)
          .fill(0)
      })

    this.originalGrid;
  }

  init() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.grid[x][y] = createVector(x, y)
      }
    }
    this.originalGrid = [...this.grid]
  }

  render(callback) {
    this.grid.forEach((column, x) => {
      column.forEach((cell, y) => {
        let base = {
          cell: cell,
          res: this.resolution,
          baseX: x,
          baseY: y,
          columns: this.columns,
          rows: this.rows
        }
        callback(base)
      })
    })
  }

  update(point) {
    if (!point) point = {x: mouseX, y: mouseY}
    let { x, y } = this.getGridLocationAt(point)
    let newOrigin = this.grid[x][y]
    this.grid = this.shiftGrid(newOrigin)
  }

  getGridLocationAt(point) {
    let xPos = Math.floor(point.x / this.resolution)
    let yPos = Math.floor(point.y / this.resolution)
    return { x: xPos, y: yPos }
  }

  shiftGrid(origin) {
    return this.grid.map(column => {
      return column.map(cell => {
        let x = cell.x - origin.x;
        let y = cell.y - origin.y;
        return createVector(x, y);
      })
    })
  }
}

/*** RENDER STYLES ***/
function coordinateCell({ cell, baseX, baseY, res }) {
  let xpos = baseX * res
  let ypos = baseY * res
  rect(xpos, ypos, res, res)
  push()
  fill(0)
  textSize(res / 5)
  text(`${cell.x}, ${cell.y}`, xpos + res / 3, ypos + res / 2)
  pop()
}

function coordinateCircles({ cell, baseX, baseY, res, columns, rows }) {

  //get the size modifier based on distance
  let minDistance = 0;
  let maxDistance = p5.Vector.dist(createVector(columns, rows), createVector(0, 0))
  let cellDistance = p5.Vector.dist(createVector(cell.x, cell.y), createVector(0, 0))

  //set circle sizes
  let minSize = res / 10;
  let maxSize = res;
  let size = map(cellDistance, minDistance, maxDistance, minSize, maxSize)

  //set base circle coordinates
  let xpos = baseX * res
  let ypos = baseY * res
  let xcenter = xpos + res / 2
  let ycenter = ypos + res / 2

  /** DRAW CIRCLES **/
  push()
  rectMode(CENTER)
  // blendMode(LIGHTEST)
  fill("#4497C399")
  ellipse(xcenter, ycenter - minSize, size, size)
  fill("#BC276C99")
  ellipse(xcenter - minSize / 2 * Math.sqrt(3), ycenter + minSize / 2, size, size)
  fill("#D9B83E99")
  ellipse(xcenter + minSize / 2 * Math.sqrt(3), ycenter + minSize / 2, size, size)
  pop()

}