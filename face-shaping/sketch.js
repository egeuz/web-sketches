var mouse;
var faceParts = []
var files = [
  "face.svg",
  "left-eye.svg",
  "left-pupil.svg",
  "lower-lip.svg",
  "nose.svg",
  "right-eye.svg",
  "right-pupil.svg",
  "upper-lip.svg"
]
var dragging = false;
var targetShape;
var targetSegment;
var sizeScale = 1.25;
var leftClick = false;
var rightClick = false;



/*** IMPORT ALL THE FILES ***/
files.forEach(function (filename) {
  project.importSVG('./assets/' + filename, function (svg) {
    var xpos = view.size.width / 2;
    var ypos = view.size.height / 2;

    //adjust positions based on the file imported
    if (filename === "upper-lip.svg") ypos += 70 * sizeScale;
    if (filename === "lower-lip.svg") ypos += 92 * sizeScale;
    if (filename === "nose.svg") ypos -= 8 * sizeScale;
    if (filename === "left-eye.svg" || filename === "left-pupil.svg") {
      xpos -= 72 * sizeScale;
      ypos -= 78 * sizeScale;
    }
    if (filename === "right-eye.svg" || filename === "right-pupil.svg") {
      xpos += 72 * sizeScale;
      ypos -= 78 * sizeScale;
    }

    svg.scale(sizeScale); //scale up the elements
    svg.children[0].remove(); //clean up the masking rectangles;
    svg.position = new Point(xpos, ypos) //set svg position
    faceParts.push(svg);
  })
})

// //create background
// let background = new Path.Rectangle({
//   point: [view.size.width / 2, view.size.height / 2],
//   size: [view.size.width, view.size.height],
//   fillColor: '#C779D0'
// }).sendToBack()

/*** highlight the svg that is being hovered on ***/
function onMouseMove(event) {
  mouse = event.point;

  //check if svgs are loaded and ready
  if (faceParts.length === files.length) {
    //highlight the path that the mouse is hovering on
    faceParts.forEach(function (svg, index) {
      var path = svg.children[0];
      path.selected = path.contains(mouse);
      //if there are other selected elements ahead of you
      for (var i = index + 1; i < faceParts.length; i++) {
        var otherPath = faceParts[i].children[0];
        if (otherPath.selected) path.selected = false;
      }
    })
  }

  if (targetSegment) {
    //if left click, move the segment
    if (leftClick) targetSegment.point += event.delta;
    //if right click, move the whole shape
    if (rightClick) targetShape.position += event.delta;
  }

}

function onMouseDown(event) {
  dragging = true;

  //find the target
  var target = faceParts
    .filter(function (part) {
      return part.children[0].selected
    })
    .map(function (part) {
      return part.children[0]
    })[0]

  //find the closest segment in the target
  if (target) {
    var closestSegment;
    var shortestDistance;
    //loop through each segment
    target.segments.forEach(function (segment) {
      //get distance between segment point and mouse point
      var segmentPoint = segment.point;
      var distance = mouse.getDistance(segmentPoint);

      //record the shortest distance
      if (!shortestDistance) {
        shortestDistance = distance;
        closestSegment = segment;
      } else if (distance < shortestDistance) {
        shortestDistance = distance;
        closestSegment = segment;
      }
    })

    targetShape = target;
    targetSegment = closestSegment;
  }
}

function onMouseUp() {
  dragging = false;
  targetSegment = null;
}


document.getElementById("download").onclick = function(){
  var fileName = "face.svg"
  var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
  var link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
 }

/*** DO THE ACTUAL INTERACTION WITH EVENT LISTENERS ***/
document
  .getElementById("canvas")
  .addEventListener("mousedown", function (event) {
    console.log(event.button);
    if (event.button === 0) {
      leftClick = true;
      rightClick = false;
    } else if (event.button === 2) {
      event.preventDefault();
      rightClick = true;
      leftClick = false;
    } else {
      leftClick = false;
      rightClick = false;
    }
  })

window.addEventListener('contextmenu', function (e) {
  if (e.target.id === "canvas") e.preventDefault();
}, false);

document.getElementById("background-slider").addEventListener("input", function(event) {
  document.getElementById("canvas").style.backgroundColor = event.target.value;
})