let img;
let res = 8;

function preload() {
  img = loadImage('test3.jpg')
}

function setup() {
  createCanvas(img.width, img.height)
  frameRate(3)
  img = pixellateImage(img, res)
}

function draw() {

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let prevState = getPixelState(x, y)
      let aliveCells = getNeighborPixelStates(x, y)
      let nextState = rules(prevState, aliveCells)

      if (nextState !== prevState) {
        let [r, g, b] = img.get(x, y)
        let c = color(255 - r, 255 - g, 255 - b)
        img.set(x, y, c)
      }
    }
  }

  img.updatePixels()
  noSmooth()
  image(img, 0, 0, width, height)
}

function pixellateImage(img, res) {
  let result = createImage(
    floor(img.width / res),
    floor(img.height / res)
  );

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let rx = floor(x / res)
      let ry = floor(y / res)
      let c = img.get(rx * res, ry * res)
      result.set(rx, ry, c)
    }
  }

  result.updatePixels()
  return result;
}

function generateImage(w, h) {
  img = createImage(w, h)
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = color(random(255), random(255), random(255))
      img.set(x, y, c)
    }
  }
  img.updatePixels()
  return img;
}

function getPixelState(x, y) {
  let [r, g, b] = img.get(x, y)
  let grayscale = r * 0.2126 + g * 0.7152 + b * 0.0722
  let state = grayscale > 123 ? 1 : 0
  return state;
}

function getNeighborPixelStates(x, y) {
  let states = []
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      if (xoff === 0 && yoff === 0) continue;

      if (x + xoff > 0 && x + xoff < img.width && y + yoff > 0 && y + yoff < img.height) {
        states.push(getPixelState(x + xoff, y + yoff))
      }
    }
  }
  return states.reduce((a, b) => a + b)
}

function rules(cell, aliveCells) {
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