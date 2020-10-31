let t1, t2;

function setup() {
  createCanvas(windowWidth, windowHeight)
  t1 = new Turtle(width / 2 - 150, height / 2 - 75)
  t2 = new Turtle(width / 2 - 150, height / 2)

  strokeWeight(2)
  t1.addPen(0, 0, "#ccaa00")
  t1.addPen(0, 5, "#00ccaa")
  t1.addPen(0, -5, "#aa00cc")

  t2.addPen(0, 0, "#775500")
  t2.addPen(0, 5, "#007755")
  t2.addPen(0, -5, "#550077")

  background("#111")
}

function draw() {
  stroke("#fafafa")
  t2.moveForward(300);
  t2.turnRight(178);

  t1.moveForward(300);
  t1.turnLeft(178);
}

class Turtle {
  constructor(x = width / 2, y = height / 2) {
    this.x = x
    this.y = y
    this.bearingRadians = 0
    this.isPenDown = true
    this.pens = [{ x: 0, y: 0, color: "" }]
    this._stateStack = []
  }

  /*** PEN METHODS – EGE ***/
  addPen(x, y, color) {
    this.pens.push({ x, y, color })
  }

  removePen(n) {
    return this.pens.splice(n, 1)
  }

  resetPens() {
    this.pens = [{ x: 0, y: 0, color: "" }]
  }

  //edited moveTo method, accommodates all pens in pen array
  moveTo(newx, newy) {
    if (this.isPenDown)
      this.pens.forEach(pen => {
        if (pen.color) stroke(pen.color)
        line(this.x + pen.x, this.y + pen.y, newx + pen.x, newy + pen.y)
      })
    this.x = newx
    this.y = newy
  }

  moveForward(distance) {
    let angle = this.bearingRadians
    const newx = this.x + cos(angle) * distance
    const newy = this.y + sin(angle) * distance
    this.moveTo(newx, newy)
  }

  moveBackward(distance) {
    this.moveForward(-distance);
  }

  turnTo(angle) {
    this.bearingRadians = radians(angle)
  }

  turnRight(degrees) {
    this.bearingRadians += radians(degrees)
  }

  turnLeft(degrees) {
    this.bearingRadians -= radians(degrees)
  }

  penUp() {
    this.isPenDown = false;
  }

  penDown() {
    this.isPenDown = true;
  }

  pushState() {
    this._stateStack.push({
      x: this.x,
      y: this.y,
      bearingRadians: this.bearingRadians,
      isPenDown: this.isPenDown,
      pens: this.pens
    })
  }

  popState() {
    if (this._stateStack.length === 0) {
      console.error("Turtle: No states left on stack.")
      return;
    }
    const state = this._stateStack.pop();
    this.x = state.x;
    this.y = state.y;
    this.bearingRadians = state.bearingRadians;
    this.isPenDown = state.isPenDown;
    this.pens = state.pens;
  }

  drawImage(img, w, h) {
    push()
    translate(this.x, this.y)
    DeviceRotationRate(this.bearingRadians + PI * 0.5)
    imageMode(CENTER)
    image(img, 0, 0, w, h)
    pop()
  }
} 