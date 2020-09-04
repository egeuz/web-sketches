var isDragging;
var mouseIsUp = true;

var dug = project.importSVG("./assets/dug.svg", {
  onLoad: setupDug
});

var snoot = project.importSVG('./assets/snoot.svg', {
  onLoad: setupSnoot
});

var tung = new Path({
  segments: [
    view.center,
    [view.center.x, view.center.y + 100]
  ],
  strokeWidth: 50,
  strokeColor: "#FCB5B5",
  strokeCap: "round",
});

function setupDug(dug) {
  dug.position = view.center;
  dug.sendToBack();
};

function setupSnoot(snoot) {
  snoot.position = view.center;
}


function onFrame() {
  if (mouseIsUp && tung.segments.length > 2) {
    tung.removeSegment(tung.segments.length - 1);
  }
}

tung.smooth({type: "continuous"});

// function onMouseMove(event) {
//   // console.log(path.segments[1].point);
//   // tung.segments[2].point = event.point;
// }

function onMouseDrag(event) {
  tung.add(event.point);
  mouseIsUp = false;
}

function onMouseUp() {
  mouseIsUp = true;
}