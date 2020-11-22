let img;
let blocks;
let res = 4;
let stepTimer = 1000;

function preload() {
  img = loadImage('img.jpg')
}

function setup() {
  createCanvas(1200, 800);
  frameRate(20)
  colorMode(HSB, 1)
  blocks = getImageBlocks(img, res)
  console.log(blocks)
}

function draw() {
  background(0)
  // noSmooth()
  noStroke()
  blocks.forEach(block => {
    fill(random(0.35, 0.95), 0.7, 0.9)
    rect(block.x, block.y, res, res)
  })
  // image(img, 0, 0, width, height)

  if (millis() > stepTimer) {
    console.log("?")
    res += res;
    stepTimer += 1000;
    blocks = getImageBlocks(img, res)
  }
}

function getImageBlocks(img, res) {
  let result = []
  for (let x = 0; x < img.width; x += res) {
    for (let y = 0; y < img.height; y += res) {
      let pixels = img.get(x, y)
      if (pixels[0] === 255) {
        result.push(createVector(x, y))
      }
    }
  }

  return result;
}

// function pixellateImage(img, res) {

//   let result = []

//   let result = createImage(
//     floor(img.width / res),
//     floor(img.height / res)
//   );

//   for (let x = 0; x < img.width; x++) {
//     for (let y = 0; y < img.height; y++) {
//       let rx = floor(x / res)
//       let ry = floor(y / res)
//       let c = img.get(rx * res, ry * res)
//       result.set(rx, ry, c)
//     }
//   }

//   result.updatePixels()
//   return result;
// }