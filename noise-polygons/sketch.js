/*** RUNTIME ***/
var numberOfPolygons = 80;

var polygons = new Array(numberOfPolygons).fill(0).map(function (polygon, index) {
  return Path.RegularPolygon({
    sides: 8,
    radius: randomFloat(50, 250),
    center: [view.center.x, view.center.y - (numberOfPolygons / 2 * 5) + (index * 5)],
    // center: view.center,
    strokeColor: {
      hue: randomFloat(200, 360),
      saturation: 0.6,
      brightness: 1,
      alpha: 1 - (index * 0.012)
    },
    blendMode: "lighter",
    strokeWidth: 1
  })
})

//additional setup for polygons
polygons.forEach(function(polygon) {
  // polygon.smooth({type: "continuous"});
})


var xoff = Math.random();
var yoff = Math.random();
noise.seed(Math.random());

function onFrame() {
  polygons.forEach(function(polygon) {
    var n = noise.simplex2(xoff, yoff);
    polygon.rotate(n * 10);
    polygon.segments.forEach(function (segment) {

      var n = noise.simplex2(xoff, yoff);
      segment.point += n;

      xoff += 0.1;
      yoff += 0.1;
    })
  })
}

/*** HELPERS ***/
function randomFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}