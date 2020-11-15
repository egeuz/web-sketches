let img;
let dots = [];
let step = 200;

function preload() {
  img = loadImage('test2.jpeg')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  background("#111")

  img.loadPixels()

  //process colors, get a dot for each color
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let [r, g, b, a] = img.get(x, y)
      let xpos = (map(r, 0, 255, 50, width) + map(g, 255, 0, 50, width)) / 2
      let ypos = (map(b, 0, 255, 50, height) + map(g, 0, 255, 50, height)) / 2
      let clr = color(r, g, b)
      xpos += noise(xpos * 0.02, ypos * 0.05, g) * step * floor(random(-1, 1))
      ypos += noise(xpos * 0.02, ypos * 0.2, g) * step * floor(random(-1, 1))
      dots.push({
        position: createVector(xpos, ypos),
        color: clr
      })
    }
  }

  // relaxationDisplacement(dots, 1, 10, 5)

  dots.forEach(dot => {
    strokeWeight(2);
    stroke(dot.color);
    point(dot.position.x, dot.position.y);
  })
}

// function relaxationDisplacement(points, steps, minDist, strength) {

//   for (let step = 0; step < steps; step++) {
//     for (let i = 0; i < points.length; i++) {
//       for (let j = 0; j < points.length; j++) {
//         if (i == j) continue;
//         let p1 = points[i].position;
//         let p2 = points[j].position;

//         var quickTest = abs(p1.x - p2.x) < minDist && abs(p1.y - p2.y) < minDist

//         if (quickTest && dist(p1.x, p1.y, p2.x, p2.y) < minDist) {
//           let v = p5.Vector.sub(p1, p2)
//           let nV = v.copy().normalize()
//           p1.x += nV.x * strength;
//           p1.y += nV.y * strength;
//           p2.x -= nV.x * strength;
//           p2.y -= nV.y * strength;
//         }

//         points[i].position = p1;
//         points[j].position = p2;
//       }
//     }
//   }
// }