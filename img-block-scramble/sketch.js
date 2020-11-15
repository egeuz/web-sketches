let img;
let dots = [];
let res = 5;
let search = 3;

function preload() {
  img = loadImage('test2.jpeg')
}

function setup() {
  createCanvas(img.width, img.height)
  img.loadPixels()
  let result = pixellateImage(img, res)

  for (let x = 0; x < result.width; x++) {
    for (let y = 0; y < result.height; y++) {
      let { rx, ry } = getRandomNearbyPixel(result, x, y, search)
      swapPixels(result, x, y, rx, ry)
    }
  }

  result.updatePixels()
  noSmooth()
  image(result, 0, 0, width, height)
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

function getRandomNearbyPixel(img, x, y, step) {
  let rxmin = (x - step > 0) ? x - step : 0
  let rymin = (y - step > 0) ? y - step : 0
  let rxmax = (x + step < img.width) ? x + step : img.width - 1
  let rymax = (y + step < img.height) ? y + step : img.height - 1
  let rx = floor(random(rxmin, rxmax))
  let ry = floor(random(rymin, rymax))
  return { rx, ry }
}

function swapPixels(img, x1, y1, x2, y2) {
  let c1 = img.get(x1, y1)
  let c2 = img.get(x2, y2)
  img.set(x1, y1, c2)
  img.set(x2, y2, c1)
}