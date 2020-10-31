let t;

function setup() {
  colorMode(HSB, 1)
  createCanvas(800, 800);
  t = new Turtle(0, 0);
  background(0)
}

function draw() {
  let res = Math.floor(random(14, 16))
  stroke(random(0.6, 0.9), 0.6, 0.65)
  strokeWeight(2)
  t.pushState()
  t.penDown()

  let turtleLoc = createVector(t.x, t.y)
  let center = createVector(width / 2, height / 2)
  let dir = p5.Vector.sub(center, turtleLoc)
  let angle = degrees(createVector(1, 0).angleBetween(dir))
  t.turnTo(angle)
  t.moveForward(random(150, 250))
  t.popState()
  t.penUp()

  if (t.y <= 0 && t.x < width) {
    t.moveTo(t.x + res, t.y)
  } else if (t.x >= width && t.y < height) {
    t.moveTo(t.x, t.y + res)
  } else if (t.y >= height && t.x > 0) {
    t.moveTo(t.x - res, t.y)
  } else if (t.x <= 0 && t.y > 0) {
    t.moveTo(t.x, t.y - res)
  }
}