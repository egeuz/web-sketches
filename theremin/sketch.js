let synth;
let hue = 0;
let saturation = 0;
let brightness = 0;

function setup() {
  colorMode(HSB, 1)
  createCanvas(windowWidth, windowHeight)
  synth = new Tone.Synth().toDestination()
}

function draw() {
  background(hue, saturation, brightness);

  if (mouseIsPressed) {
    hue = map(mouseX, 0, width, 0, 1)
    brightness = map(mouseY, 0, height, 0, 1)
    if (saturation < 0.8) saturation += 0.1
    const freq = map(mouseX, 0, width, 32, 523)
    const volume = map(mouseY, 0, height, 0, 20)
    synth.volume.value = volume
    synth.triggerAttackRelease(freq, "4n")
  }

  if (!mouseIsPressed && saturation > 0)
    saturation -= 0.1;
}