const number_of_dots = 100
const frequency = 0.15
let dots;

function setup() {
  createCanvas(400, 400)
  background(50)
  colorMode(HSB, 1)
  ellipseMode(CENTER)
  noStroke()
  //place and draw the dots
  dots = generateDots()
  dots = relaxDots()
  drawDots()
}

function generateDots() {
  return new Array(number_of_dots)
    .fill(0)
    .map((d, i) => {
      let x = noise(i * frequency, 0) * width
      let y = noise(i * frequency, 1000) * height
      return createVector(x, y)
    })
}

//thanks Justin for the relaxed displacement code: i tried to rewrite it as much as i could in my own words
function relaxDots(steps, min_distance, strength) {

  for (var step = 0; step < steps; step++) {
    for (var i = 0; i < dots.length; i++) {
      for (var j = 0; j < points.length; j++) {
        if (i == j)
          continue;
        var p1 = dots[i]
        var p2 = dots[j]

        // how does quickTest differ from the condition that follows it?
        var quickTest = abs(p1.x - p2.x) < min_distance &&
          abs(p1.y - p2.y) < min_distance
        if (quickTest && dist(p1, p2) < min_distance) {
          var v = p5.Vector.sub(p1, p2)
          var nV = v.copy().normalize()
          p1.x += nV.x * strength;
          p1.y += nV.y * strength;
          p2.x -= nV.x * strength;
          p2.y -= nV.y * strength;
        }
        dots[i] = p1;
        dots[j] = p2;
      }
    }
  }

  return dots
}

function drawDots() {
  dots.forEach(dot => {
    var diameter = random(5, 15);
    const randomHue = (random(0.05, 0.95) + random(0.05, 0.95)) / 2;
    fill(randomHue, 1, 1)
    ellipse(dot.x, dot.y, diameter, diameter);
  })
}