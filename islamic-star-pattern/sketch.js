
// let poly;
let polygonGrid;

//individual polygon settings
let radius, sides, angle, delta;
let radius_slider,
  sides_slider,
  angle_slider,
  delta_slider;

let t = 0;

function setup() {
  colorMode(HSB, 1);
  createCanvas(windowWidth, windowHeight).parent("canvas");

  //INIT SLIDERS
  createP("Radius").parent("controls");
  radius_slider = createSlider(50, 300, 100).parent("controls");
  createP("Sides").parent("controls");
  sides_slider = createSlider(3, 15, 6).parent("controls");
  createP("Angle").parent("controls");
  angle_slider = createSlider(15, 90, 60).parent("controls");
  createP("Center Offset").parent("controls");
  delta_slider = createSlider(0, radius_slider.value() / 6, 0).parent("controls");

  radius_slider.elt.addEventListener("input", (e) => {
    val = delta_slider.value();
    delta_slider.remove();
    delta_slider = createSlider(0, radius_slider.value() / 6, val).parent("controls");
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#222")
  stroke(255);
  strokeWeight(2);

  setSliderValues();

  let cols = Math.floor(width / radius) + 1;
  let rows = Math.floor(height / radius) + 1;

  let strokeCol = color(noise(t), 0.3, 0.95);
  stroke(strokeCol);
  t += 0.01;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let xpos = radius * x + radius / 2
      let ypos = radius * y + radius / 2
      const poly = new Polygon(xpos, ypos, radius, sides, angle, delta);
      poly.init();
      poly.render();
    }
  }
}

function setSliderValues() {
  radius = radius_slider.value()
  sides = sides_slider.value()
  angle = angle_slider.value()
  delta = delta_slider.value()
}



