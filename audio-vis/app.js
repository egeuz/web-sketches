let shape;
let audio;

function preload() {
  audio = loadSound('./assets/snare.wav')
}

function setup() {
  createCanvas(800, 800)
  rectMode(CENTER)
  shape = new AudioShape({
    position: createVector(400, 400),
    size: 200,
    color: color(255, 0, 0),
    audio: audio,
    render
  })
  shape.init()
}

function draw() {
  background(0)
  shape.run()
}

function mousePressed() {
  shape.handleMouseDown()
}

function mouseReleased() {
  shape.handleMouseUp()
}

/*** RENDER METHOD ***/
/*** setup all visualizations that have to do with the audio here ***/
function render(obj) {
  //animate shape's size based on point in beat
  let duration = obj.audio.duration() * 1000 / obj.playbackRate;
  let mod = map(millis() % duration, 0, duration, 0, 360)
  let scale = map(sin(radians(mod)), -1, 1, 0.9, 1.2)
  let size = obj.size * scale;

  //set rotation speed based on volume
  obj.rotation += 0.01 * obj.playbackRate;

  //set color based on volume
  let [r, g, b] = obj.color.levels;
  let a = floor(map(obj.volume, 0, 1, 100, 255))

  //draw the object
  push()
  translate(obj.position.x, obj.position.y)
  fill(r, g, b, a)
  rotate(obj.rotation)
  polygon(5, size) //draw a pentagon
  pop()
}

function polygon(sides, radius) {
  beginShape()
  for (let i = 0; i < sides; i++) {
    let angle = TWO_PI / sides * i
    let x = cos(angle) * radius / 2;
    let y = sin(angle) * radius / 2;
    vertex(x, y)
  }
  endShape(CLOSE)
}