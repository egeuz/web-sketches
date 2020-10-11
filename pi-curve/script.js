let pi,
  start,
  length,
  speed,
  mode,
  currentPoint; //for walker visualization

const mainColor = "#00ffaa";

/*** LOAD PI ARRAY ***/
async function loadPiArray() {
  let response = await fetch('pi-million.txt')
  let txt = await response.text()
  txt = txt.replace('.', '0')
  let arr = txt.split('')
  return arr
}

/*** RUNTIME ***/
async function setup() {
  pi = await loadPiArray()
  initializeControls();
  frameRate(speed)
  const canvas = createCanvas(1200, 600)
  canvas.parent("canvas")
  currentPoint = createVector(width / 2, height / 2)
}

function draw() {

  background("#111")

  if (pi) {

    switch (mode) {
      case 'Skyline':
        noStroke();
        fill(mainColor);
        drawSkyline();
        break;
      case 'Wave':
        noFill();
        stroke(mainColor);
        strokeWeight(5);
        drawWave();
        break;
      case 'Walker':
        noFill();
        stroke(mainColor);
        strokeWeight(5);
        drawWalker();
        break;
      case 'NoiseField':
        drawNoiseField();
        break;
      default:
        drawSkyline();
        break;
    }


    if (start > pi.length) start = 0;
    const digit = document.getElementById("digit")
    document.getElementById("digit").value = start;
    start++;

  }
}


/*** VISUALIZATIONS ***/

function drawSkyline() {
  const baseHeight = height / 12

  for (let i = 0; i < length; i++) {
    let n = i + start;
    let blockWidth = width / length;
    let blockHeight = baseHeight * (parseInt(pi[n]) + 1)
    let blockX = blockWidth * i;
    let blockY = height - blockHeight;
    rect(blockX, blockY, blockWidth, blockHeight);
  }
}

function drawWave() {
  const margin = 100;
  const bottom = height - margin;
  const top = margin;
  const baseHeight = (height - margin * 2) / 10

  beginShape()
  for (let i = 0; i < length; i++) {
    let n = i + start;
    let x = width / length * i;
    let y = bottom - baseHeight * (parseInt(pi[n]) + 1)
    if (i === 0 || i === length - 1) curveVertex(x, y)
    curveVertex(x, y)
  }
  endShape()
}

function drawWalker() {
  const baseRotation = TWO_PI / 10;
  const walkLength = 10;

  //get coordinate points
  let coordinates = [];

  for (let i = 0; i < length; i++) {
    coordinates.push(currentPoint.copy());
    let n = i + start;
    let digit = parseInt(pi[n]) + 1
    let angle = baseRotation * digit;
    let x = currentPoint.x + cos(angle) * (walkLength + digit);
    let y = currentPoint.y + sin(angle) * (walkLength + digit);
    currentPoint = createVector(x, y);
  }

  beginShape()
  coordinates.forEach(c => {
    vertex(c.x, c.y)
    push()
    strokeWeight(10)
    point(c.x, c.y)
    pop()
  })
  endShape()
}

/*** CONTROLS INIT ***/
function initializeControls() {
  const input_digit = document.getElementById("digit")
  const input_length = document.getElementById("length")
  const input_speed = document.getElementById("speed")
  const input_mode = document.getElementById("mode")

  start = parseInt(input_digit.value)
  length = parseInt(input_length.value)
  speed = parseInt(input_speed.value)
  mode = input_mode.options[input_mode.selectedIndex].value;

  input_digit.addEventListener("input", (event) => {
    start = parseInt(event.target.value);
  })

  input_length.addEventListener("input", (event) => {
    length = parseInt(event.target.value);
  })

  input_speed.addEventListener("input", (event) => {
    speed = parseInt(event.target.value);
    frameRate(speed)
  })

  input_mode.addEventListener("input", (event) => {
    let options = event.target.options;
    let index = event.target.selectedIndex;
    let newMode = options[index].value;
    console.log(newMode)
    mode = newMode;
  })

}