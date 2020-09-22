function setup() {
  createCanvas(windowWidth * 3, windowHeight);
  colorMode(HSB, 1);
  background(0, 0, 0.08);
  generateGallery(50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth * 3, windowHeight);
  generateGallery(50, 50);
}


function generateGallery(x, y) {

  let gap = x;
  let maxWidth = width - x;
  let i = 0;

  while (x < maxWidth) {
    console.log(x);
    let canvasWidth = random(450, 650);
    let canvasHeight = canvasWidth * random(1.1, 1.4);
    if (x + canvasWidth > maxWidth) break;
    drawRothko(x, y, canvasWidth, canvasHeight, 3);
    x += canvasWidth + gap;
    i++
  }
}


function drawRothko(x, y, width, height, maxBlocks) {

  let bottomMargin = 0;
  const canvasEnd = y + height;

  let { hue, saturation, brightness } = randomHSB();
  fill(hue, saturation, brightness);
  noStroke();
  rect(x, y, width, height);

  //loop for max blocks, but if you hit the canvas limits before it stops
  for (let i = 0; i < maxBlocks; i++) {

    //make block drawing calculations and randomizations
    let xgap = width * random(0.1, 0.15);
    let block_x = x + xgap / 2;
    let block_width = width - xgap;
    let ygap = height * random(0.03, 0.07);
    let block_y = y + ygap;
    let block_height = height * (random(0.2, 0.4) + random(0.2, 0.4)) / 2;

    //clamp height of last block to the space remaining
    if (block_y + block_height > canvasEnd) {
      block_height = canvasEnd - y - bottomMargin * 2.5;
    }
    //pick a random color and draw the rothko block
    let block_color = randomHSB();
    drawBlock(block_x, block_y, block_width, block_height, block_color);

    //loop cleanup
    //if first step in loop, determine bottom margin;
    if (i === 0) bottomMargin = ygap;
    //set y location for the next block;
    y = block_y + block_height;
    //end the loop completely if canvas height exceeds max;
    if (y + bottomMargin >= canvasEnd) return;
  }
}

function drawBlock(x, y, width, height, baseColor) {

  let { hue, saturation, brightness } = baseColor;

  for (let j = y; j < y + height; j += 0.25) {
    let variance = 10;
    let randomLineWidth = Math.floor(random(width - variance, width));
    let offset = (randomLineWidth - width) / 2;
    let lean = random(-4, 4);
    stroke(hue, saturation, brightness * random(0.6, 0.7), random(0.3, 0.4));
    strokeWeight(random(0.5, 3));
    line(x + offset, j, x + width - offset, j + lean);
  }

  for (let i = x; i < x + width; i += 0.25) {
    let variance = 20;
    let randomlineHeight = Math.floor(random(height - variance, height));
    let offset = (randomlineHeight - height) / 2;
    let lean = random(-4, 4);
    stroke(hue, saturation, brightness * random(0.6, 0.7), random(0.3, 0.4));
    strokeWeight(random(0.5, 3));
    line(i, y + offset, i + lean, y + height - offset);
  }
}

function randomHSB() {
  return {
    hue: random(0, 0.15), saturation: random(0.4, 0.9), brightness: random(0.4, 1)
  };
}