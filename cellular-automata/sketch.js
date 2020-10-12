/*** RUNTIME ***/
const density = document.getElementById("density");
const submit = document.getElementById("submit");
let cellDensity = parseFloat(density.value);

submit.addEventListener("click", event => {
  event.preventDefault()
  cellDensity = parseFloat(density.value);
  gameOfLife = new GameOfLife(res)
  gameOfLife.initializeCells()
})

let gameOfLife;
let res = 9;

/*** RUNTIME ***/
function setup() {
  createCanvas(windowWidth, windowHeight)
  gameOfLife = new GameOfLife(res)
  gameOfLife.initializeCells()
  noStroke()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  gameOfLife = new GameOfLife(res)
  gameOfLife.initializeCells()
}

function draw() {
  background(255)
  gameOfLife.run()
}

/*** CLASSES ***/

class GameOfLife {
  constructor(res) {
    this.resolution = res;
    this.columns = Math.floor(width / res) + 1;
    this.rows = Math.floor(height / res) + 1;
    this.grid = new Array(this.columns)
      .fill(0)
      .map((a, x) =>
        new Array(this.rows)
          .fill(0)
          .map((b, y) => new Cell(x * res, y * res, res))
      )
    this.nextGen = [...this.grid]
  }

  run() {
    this.grid.forEach(column => {
      column.forEach(cell => {
        cell.render();
        cell.generate();
      })
    })
  }

  initializeCells() {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        const cell = this.grid[x][y]
        cell.neighbors = this.getCellNeighbors(x, y)
      }
    }
  }

  getCellNeighbors(x, y) {
    let neighbors = []
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {

          if (this.grid[x + xoff] && this.grid[x + xoff][y + yoff]) {

            if (xoff === 0 && yoff === 0) continue
            let neighbor = this.grid[x + xoff][y + yoff]
            neighbors.push(neighbor)
          }
      }
    }
    return neighbors
  }
}


class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.state = random() > cellDensity ? 0 : 1;
    this.history = [];
    this.neighbors = [];
    this.age = 0;
  }

  generate() {
    let aliveCells = this.neighbors.map(n => n.state).reduce((a, b) => a + b)
    let newState = this.rules(this.state, aliveCells);

    if (this.state === 1 && newState === 1) this.age += 1;
    if (newState === 0) this.age = 0;

    this.history.push(this.state);
    this.state = newState;
  }

  render() {
    alpha = 200 / (this.age + 1) * 2;
    if (this.state === 1) {
      fill(40, 150, 240, alpha)
    } else {
      fill(40, 40, 80)
    }
    rect(this.x, this.y, this.size, this.size)
  }

  rules(cell, aliveCells) {
    if (cell === 1 && aliveCells < 2) {
      return 0
    } else if (cell === 1 && aliveCells > 3) {
      return 0
    } else if (cell === 0 && aliveCells === 3) {
      return 1
    } else {
      return cell
    }
  }
}