let img;
// let res = 5;

function preload() {
  img = loadImage('test2.jpeg')
}


function setup() {
  createCanvas(img.width, img.height)
  img.loadPixels()

  for (let i = 0; i < 1; i++) {
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        //get image's color state
        let [r, g, b] = img.get(x, y)
        let prevState = getPixelState(r, g, b)
        let alivePixels = getNeighborPixelStates(x, y)
        let newState = rules(prevState, alivePixels)

        if (prevState !== newState) {
          let col = color(255 - r, 255 - g, 255 - b) // invert color
          img.set(x, y, col)
        }
      }
    }
    img.updatePixels()
  }


  noSmooth()
  image(img, 0, 0, width, height)
}

function getPixelState(r, g, b) {
  //formula from: https://entropymine.com/imageworsener/grayscale/
  let grayscale = r * 0.2126 + g * 0.7152 + b * 0.0722
  let state = grayscale > 123 ? 1 : 0
  return state;
}

function getNeighborPixelStates(x, y) {
  let states = []
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      if (xoff === 0 && yoff === 0) continue;
      let nx = x + xoff;
      let ny = y + yoff;
      if (nx > 0 && ny > 0 && nx < img.width && ny < img.height) {
        let [r, g, b] = img.get(x, y)
        states.push(getPixelState(r, g, b))
      } else {
        continue;
      }
    }
  }
  return states.reduce((a, b) => a + b);
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

// function getRandomNearbyPixel(img, x, y, step) {
//   let rxmin = (x - step > 0) ? x - step : 0
//   let rymin = (y - step > 0) ? y - step : 0
//   let rxmax = (x + step < img.width) ? x + step : img.width - 1
//   let rymax = (y + step < img.height) ? y + step : img.height - 1
//   let rx = floor(random(rxmin, rxmax))
//   let ry = floor(random(rymin, rymax))
//   return { rx, ry }
// }

// function swapPixels(img, x1, y1, x2, y2) {
//   let c1 = img.get(x1, y1)
//   let c2 = img.get(x2, y2)
//   img.set(x1, y1, c2)
//   img.set(x2, y2, c1)
// }