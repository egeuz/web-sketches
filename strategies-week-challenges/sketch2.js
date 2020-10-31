const startX = 50;
const startY = 250;
const endX = 450;
const endY = 50;
let time = 0;
let numberOfDots = 200;
let frequency_slider, amplitude_slider, timespeed_slider;

function setup() {
  createCanvas(500, 300);
  colorMode(HSB, 1);
  createP('Frequency');
  frequency_slider = createSlider(0, 40, 20);
  createP('Amplitude');
  amplitude_slider = createSlider(0, 100, 50);
  createP('Time Speed');
  timespeed_slider = createSlider(0, 15, 7.5);
}

function draw() {
  background(0, 0, 0.1);
  ellipseMode(CENTER);
  noiseDetail(1, .5);
  fill(255, 0.5);
  noStroke();

  let frequency = frequency_slider.value() / 100
  let amplitude = amplitude_slider.value() / 10
  let timespeed = timespeed_slider.value() / 100

  for (i = 0; i < numberOfDots; i++) {
    let x = map(i, 0, numberOfDots, startX, endX)
    let y = map(i, 0, numberOfDots, startY, endY)
    let xoff = noise(x * frequency, time) * amplitude * 10;
    let yoff = noise(y * frequency, time) * amplitude * 10;
    ellipse(x + xoff, y + yoff, 10, 10);
  }
  
  time += timespeed;
}