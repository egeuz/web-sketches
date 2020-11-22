class AudioShape {
  constructor({
    position = createVector(width / 2, height / 2), //p5 vector
    size = 100, //int
    color = color(255, 255, 255), //p5 color
    audio, //p5 audio
    render, //function
    animation //function
  }) {
    //rendering properties
    this.position = position;
    this.size = size;
    this.color = color;
    this.rotation = 0;
    this.renderMethod = render
    this.animationMethod = animation
    //audio properties
    this.audio = audio;
    this.playbackRate = 1;
    this.volume = 1;
    //event properties
    this.dragging = false;
    this.onmousedown;
    this.onmouseup;
  }

  /*** RUNTIME METHODS ***/
  init() {
    //setup and start playing audio
    this.updateAudioSettings()
    this.playAudio()
  }

  run() {
    this.handleDrag()
    this.render()
  }

  /*** SHAPE METHODS ***/
  move(x, y) {
    this.position = createVector(x, y)
  }

  render() {
    this.renderMethod(this)
  }

  /*** EVENT METHODS ***/
  handleDrag() {
    if (this.dragging) {
      this.move(mouseX, mouseY)
    }
  }

  /*** EVENT HANDLERS ***/
  intersects(point) {
    //check if mouse is targeting this particular object
    let { x, y } = this.position;
    let start = createVector(x - this.size / 2, y - this.size / 2)
    let end = createVector(x + this.size / 2, y + this.size / 2)
    return point.x >= start.x &&
      point.x <= end.x &&
      point.y >= start.y &&
      point.y <= end.y
  }

  handleMouseDown() {
    let mouse = createVector(mouseX, mouseY)
    if (this.intersects(mouse))
      this.dragging = true;
  }

  handleMouseUp() {
    if (this.dragging) {
      this.updateAudioSettings()
      this.playAudio()
      this.dragging = false
    }
  }

  /*** AUDIO METHODS ***/
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

