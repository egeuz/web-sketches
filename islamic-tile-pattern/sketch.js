let poly;
let radius = 100;
let sides = 6;

function setup() {
  createCanvas(500, 500)
  poly = new Polygon(250, 250, radius, sides, 60);
  poly.init();
}

function draw() {
  background("#222")
  stroke(255);
  strokeWeight(2);
  poly.render();
}