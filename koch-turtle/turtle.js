
/*** TURTLE CLASS – ADAPTED FROM JUSTIN'S LIBRARY ***/
class Turtle {
  constructor(x = width / 2, y = height / 2) {
    this.x = x
    this.y = y
    this.bearingRadians = 0
    this.isPenDown = true
    this.pens = [{ x: 0, y: 0, color: "" }]
    this._stateStack = []
    this.speed = 5;
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