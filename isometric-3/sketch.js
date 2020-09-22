let plane1, plane2, plane3;
let cube = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  background(5);
  let point = createVector(0, 0);

  plane1 = new Plane(point, "width", -200, "depth", -200, 4);
  plane2 = new Plane(point, "depth", -200, "height", 200, 4);
  plane3 = new Plane(point, "width", -200, "height", 200, 4);
  cube = [plane1, plane2, plane3];

  cube.forEach(plane => {plane.init()})
  noiseDetail(2, 0);
}

function draw() {
  background(5);
  fill(255);
  noStroke();

  translate(width / 2, height / 2);

  for (let i = cube.length - 1; i >= 0; i--) {
    let plane = cube[i];
    plane.animate();
    plane.render();
  }
}