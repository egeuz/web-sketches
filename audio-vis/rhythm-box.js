let hat, kick, snare, clap;
let hatShape, kickShape, snareShape, clapShape;

const square = ({position, size, color, angle, volume}) => {
  let opacity = floor(map(volume, 0, 1, 55, 255)).toString(16)
  push()
  translate(position.x, position.y)
  fill(color + opacity)
  rotate(angle)
  rect(0, 0, size, size)
  pop()
}

function preload() {
  clap = loadSound('./assets/clap.wav')
  hat = loadSound('./assets/hat.wav')
  kick = loadSound('./assets/kick.wav')
  snare = loadSound('./assets/snare.wav')
}

function setup() {
  rectMode(CENTER)
  createCanvas(800, 800)

  clapShape = new AudioShape(
    {
      position: createVector(400, 400),
      size: 100,
      color: "#ffffff",
      audio: hat,
      renderFunction: square
    }
  )

  hatShape = new AudioShape(
    {
      position: createVector(400, 600),
      size: 100,
      color: "#ff0000",
      audio: hat,
      renderFunction: square
    }
  )

  kickShape = new AudioShape(
    {

      position: createVector(600, 400),
      size: 100,
      color: "#00ff00",
      audio: hat,
      renderFunction: square
    }
  )

  snareShape = new AudioShape(
    {
      position: createVector(600, 600),
      size: 100,
      color: "#0000ff",
      audio: snare,
      renderFunction: square
    }
  )

  clapShape.init()
  hatShape.init()
  kickShape.init()
  snareShape.init()
}

function draw() {
  background(0)
  clapShape.run()
  hatShape.run()
  kickShape.run()
  snareShape.run()
}

function mousePressed() {
  let mouse = createVector(mouseX, mouseY)
  if (hatShape.intersects(mouse)) hatShape.onMouseDown()
  if (clapShape.intersects(mouse)) clapShape.onMouseDown()
  if (kickShape.intersects(mouse)) kickShape.onMouseDown()
  if (snareShape.intersects(mouse)) snareShape.onMouseDown()
}

function mouseReleased() {
  if (hatShape.dragging) hatShape.onMouseUp()
  if (clapShape.dragging) clapShape.onMouseUp()
  if (kickShape.dragging) kickShape.onMouseUp()
  if (snareShape.dragging) snareShape.onMouseUp()
}

class AudioShape {
  constructor({
    position = createVector(width / 2, height / 2),
    size = 100,
    color = "#fff",
    audio,
    renderFunction
  }) {
    this.position = position;
    this.size = size;
    this.color = color;
    this.audio = audio;
    this.renderFunction = renderFunction;
    this.dragging = false;
    this.playbackRate = 1;
    this.volume = 1;
    this.angle = 0;
  }

  init() {
    this.updateAudioSettings()
    this.playAudio()
  }

  run() {
    if (this.dragging)
      this.move()
    this.update()
    this.render()
  }

  move() {
    this.position = createVector(mouseX, mouseY)
  }

  update() {
    this.angle += 0.05 * this.playbackRate;
  }

  render() {
    this.renderFunction(this)
    // this.renderFunction(this.position, this.size, this.color, this.angle)
  }

  intersects(point) {
    let { x, y } = this.position;
    let size = this.size;
    let start = createVector(x - size / 2, y - size / 2)
    let end = createVector(x + size / 2, y + size / 2)
    if (point.x >= start.x && point.y >= start.y && point.x <= end.x && point.y <= end.y) {
      return true;
    } else {
      return false;
    }
  }

  onMouseDown() {
    this.dragging = true;
  }

  onMouseUp() {
    this.updateAudioSettings()
    this.playAudio()
    this.dragging = false
  }

  updateAudioSettings() {
    let { x, y } = this.position;
    this.playbackRate = map(x, 0, width, 0, 2)
    this.volume = map(y, 0, height, 1, 0)
  }

  playAudio() {
    this.audio.stop()
    this.audio.loop(0, this.playbackRate, this.volume)
  }
}

// function square(pos, size) {
  // fill(255)
  // console.log("helloo")
  // rect(pos.x, pos.y, size, size)
// }