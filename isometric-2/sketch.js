let plane1, plane2, plane3;
let cube = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5);
  let point = createVector(width / 2, height / 2);

  plane1 = new Plane(point, "width", -300, "depth", -300, 15);
  plane2 = new Plane(point, "depth", -300, "height", 300, 15);
  plane3 = new Plane(point, "width", -300, "height", 300, 15);
  cube = [plane1, plane2, plane3];

  cube.forEach(plane => {plane.init()})
  noiseDetail(4, 0);
}

function draw() {
  background(5);
  fill(255);
  noStroke();

  cube.forEach(plane => {
    plane.init()
    plane.render()
  })
}