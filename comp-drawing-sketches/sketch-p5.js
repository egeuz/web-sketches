
const dash = 60;
const gap = 10;
const margin = 100;
const driftTime = 25;
let points;
let segments = [];

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas");
  colorMode(HSB)
  fill(0);
  strokeWeight(3);
  frameRate(15);

  points = generatePath(20);
  renderPath();
}


function draw() {
  clear();
  
  for (let i = 0; i < driftTime; i++) {
    segments.forEach(segment => {
      const randomDir = p5.Vector.random2D().mult(random(20));
      const newSegment = {
        start: segment.start.copy().add(randomDir),
        end: segment.end.copy().add(randomDir)
      }
      stroke(random(150, 300), 80, 100, 0.75);
      line(newSegment.start.x, newSegment.start.y, newSegment.end.x, newSegment.end.y);
      segment = newSegment;
    })
  }

  if (mouseIsPressed) {
    segments = [];
    points = generatePath(20);
    renderPath();
  }
}

/*** HELPER METHODS ***/
function generatePath(n = 8) {
  const points = [];
  for (let i = 0; i < n; i++) {
    const x = randomFloat(margin, window.innerWidth - margin);
    const y = randomFloat(margin, window.innerHeight - margin);
    const point = createVector(x, y);
    points.push(point);
  }
  return points;
}

function renderPath() {
  points.forEach((point, index) => {
    if (index === points.length - 1) return;

    let currentPoint = point;
    const nextPoint = points[index + 1];
    const vector = nextPoint.copy().sub(currentPoint);
    const dashVector = vector.copy().setMag(dash);
    const gapVector = vector.copy().setMag(gap);

    const dashNum = vector.mag() / (dash + gap);

    for (let i = 0; i < dashNum; i++) {
      const lineEnd = p5.Vector.add(currentPoint, dashVector);
      line(currentPoint.x, currentPoint.y, lineEnd.x, lineEnd.y);
      segments.push({
        start: currentPoint,
        end: lineEnd
      })
      currentPoint = p5.Vector.add(lineEnd, gapVector);
    }
  })
}

/*** HELPER METHODS ***/
function randomFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function randomInt(min, max) {
  return Math.floor(randomFloat(min, max));
}

function randomHSL(saturation = 60, lightness = 100, alpha = 1) {
  const hue = randomInt(0, 360);
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}