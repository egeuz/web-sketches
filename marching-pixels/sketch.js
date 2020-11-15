let img;

function setup() {
  createCanvas(600, 600).parent("canvas")
  img = createImage(150, 150)
  // noLoop()


}

function draw() {
  background(255)

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let noiseVals = getPixelNoise(x, y)
      let state = getPixelState(noiseVals)
      let clr = getStateColor(state)
      // let clr = color(state * 16, state * 8, state * 4)
      img.set(x, y, clr)
    }
  }

  img.updatePixels()
  noSmooth()
  image(img, 0, 0, width, height)
}

function randomRGB() {
  return color(random(255), random(255), random(255))
}

function getPixelNoise(x, y) {
  let detail = 0.03;
  let freq = 0.01;

  //generate an array of noise values
  return new Array(4)
    .fill(0)
    .map((v, i) =>
      noise(
        x * detail + 10 ** i,
        y * detail + 10 ** i,
        frameCount * freq
      )
    )
}

function getPixelState(pixelArray) {

  pixelArray = pixelArray.map(v => (v > 0.5) ? 1 : 0)
  let [r, g, b, a] = pixelArray

  return r * 8 + g * 4 + b * 2 + a * 1;
}

function getStateColor(state) {
  let s;
  switch (state) {
    case 0:
    case 15:
      s = 4;
      return color(s * 8, 0, s * 16)
    case 1:
    case 2:
    case 4:
    case 7:
    case 8:
    case 11:
    case 13:
    case 14:
      s = 6;
      return color(s * 8, 0, s * 16)
    case 3:
    case 6:
    case 9:
    case 12:
      s = 8;
      return color(s * 16, 0, s * 8)
    case 5:
    case 10:
      s = 16;
      return color(s * 8, 0, s * 16)
    default:
      return;
  }
}