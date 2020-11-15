let img;
let rounds = 5;
let swapRadius = 80;

function preload() {
  img = loadImage("./img-2.png")
}

function setup() {
  createCanvas(img.width, img.height).parent("canvas")
  background(255)
  img.loadPixels()

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      const rx = x + floor(random(swapRadius))
      const ry = y + floor(random(swapRadius))
      const thisPixel = img.get(x, y)
      const randomPixel = img.get(rx, ry)
      // rx = x + floor(random(img.width))
      // ry = y + floor(random(img.height))
      img.set(x, y, randomPixel)
      img.set(rx, ry, thisPixel)
    }
  }

  img.updatePixels()
  image(img, 0, 0)
}