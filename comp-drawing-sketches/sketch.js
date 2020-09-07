var dash = 50;
var gap = 20;
var driftTime = 30;
var trace = true;
var segments = []
var driftSegments = []

// var points = [
//   new Point(300, 300),
//   new Point(300, 400),
//   new Point(400, 400)
// ];

// var path = new Path.RegularPolygon({
//   center: view.center,
//   sides: 6,
//   radius: 300,
//   visible: false
// })

var inputPath = project.importSVG("./test.svg", {
  onLoad: function(path) {
    path.position = view.center
    path.visible = false;
    setup(path.children[1]);
  }
});




/*** SETUP ***/

function setup(path) {
  for (var i = 0; i < path.segments.length; i++) {
    var currentPoint = path.segments[i].point;
    var nextPoint = (i === path.segments.length - 1) ?
      path.segments[0].point :
      path.segments[i + 1].point;
  
    var vector = nextPoint - currentPoint;
    var dashNum = vector.length / (dash + gap);
    var dashVector = vector.normalize(dash);
    var gapVector = vector.normalize(gap);
  
    for (var j = 0; j < dashNum; j++) {
      var newPath = new Path({
        segments: [currentPoint, currentPoint + dashVector],
        strokeColor: {
          hue: Math.random() * 360,
          saturation: 0.6,
          brightness: 1
        },
        strokeWidth: 5,
      })
      segments.push(newPath);
      currentPoint = currentPoint + dashVector + gapVector
    }
  
    for (var j = 0; j < driftTime; j++) {
      for (var k = 0; k < segments.length; k++) {
        var randomDirection = Point.random() * randomFloat(-10, 10);
        if (trace) {
          var newSegment = segments[k].clone();
          newSegment.position += randomDirection;
          newSegment.strokeColor = {
            hue: Math.random() * 360,
            saturation: 0.6,
            brightness: 1
          };
  
          driftSegments.push(newSegment);
  
        } else {
          segments[k].position += randomDirection;
        }
      }
    }
  }
}

// var path = new Path({
//   segments: points,
//   strokeColor: "black"
// })

// console.log(path);


function onFrame() {
  // item.remove();

  for (var i = 0; i < driftSegments.length; i++) {
    driftSegments[i].position += Point.random() * randomFloat(-10, 10);;
  }

  for (var i = 0; i < segments.length; i++) {
    segments[i].position += Point.random() * randomFloat(-10, 10);
  }
}



/*** HELPER METHODS ***/
function randomFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function randomHue() {
  return ({
    hue: Math.random() * 360,
    saturation: 0.6,
    brightness: 1
  })
}