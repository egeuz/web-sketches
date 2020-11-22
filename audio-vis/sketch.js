let sound, fft;

function preload() {
  sound = loadSound('./assets/black-car.mp3')
}

function setup() {
  createCanvas(800, 600)
  frameRate(30)
  colorMode(HSB, 1)
  fft = new p5.FFT()
  fft.setInput(sound)
  sound.loop(0, 1, 0.2, 0)
}

function draw() {
  background(0)
  noFill()
  strokeWeight(4)
  const waveform = fft.waveform()
  renderWaveform(waveform, vertexWave)
  // const amplitudes = fft.analyze()
  // const bass = fft.getEnergy("bass", "lowMid")
  // const treble = fft.getEnergy("highMid", "treble")
  // console.log(bass)
  // const min = Math.min(...waveform)
  // const max = Math.max(...waveform)

  // console.log(waveform)

  // waveform.forEach((val, i) => {
  //   const x = map(i, 0, 128, 0, width)
  //   const y = map(val, min, max, height - 100, 100)
  //   ellipse(x, y, 10, 10)
  // })

  // renderWaveform(waveform, circleWave)

}

function renderWaveform(waveform, renderMethod) {
  renderMethod(waveform);
  beginShape()
  waveform.forEach((val, i) => {
    renderMethod(val, i, waveform.length)
  })
  endShape()
}

function vertexWave(wave) {
  const len = wave.length;
  beginShape()
  waveform.forEach((val, i) => {
    let x = map(i, 0, len, 100, width - 100)
    let y = map(val, -0.5, 0.5, -height, height * 2)
    let hue = map(val, -0.1, 0.1, 0.45, 0.9)
    stroke(hue, 0.8, 0.9)
    vertex(x, y)
  })
  endShape()
}