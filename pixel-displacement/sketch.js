let img;
let radius = 100;
let freq = 1;

function preload() {
  img = loadImage('test.png')
}

function setup() {
  createCanvas(img.width, img.height)

  img.loadPixels()

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let nx = x * freq * random()
      let ny = y * freq * random()
      let noisex = x + floor(noise(nx, ny) * radius);
      let noisey = y + floor(noise(nx, ny) * radius);
      swapPixels(img, x, y, noisex, noisey)
    }
  }

  img.updatePixels()

  image(img, 0, 0, width, height)
}



function swapPixels(img, x1, y1, x2, y2) {
  let c1 = img.get(x1, y1)
  let c2 = img.get(x2, y2)
  img.set(x1, y1, c2)
  img.set(x2, y2, c1)
  return img;
}

function randomInt(val1, val2) {
  return floor(random(val1, val2))
}