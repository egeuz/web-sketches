


/*** INIT ***/
var time = 0;
var resolution = 20;
var width = view.size.width;
var height = view.size.height;
var columns = Math.ceil(width / resolution + 1);
var rows = Math.ceil(height / resolution + 1);

var xmodifier = Math.random();
var ymodifier = Math.random();

var fills = [
  "#000",
  "#111",
  "#222",
  "#333",
  "#444",
  "#555",
  "#666",
  "#777",
  "#888",
  "#999",
  "#aaa",
  "#bbb",
  "#ccc",
  "#ddd",
  "#eee",
  "#fff"
]

var cornerValues = new Array(columns).fill(0)
  .map(function () {
    return new Array(rows).fill(0)
  })

var paths = new Array(columns - 1).fill(0)
  .map(function () {
    return new Array(rows - 1).fill(0)
  })

initializePaths();
init();

/*** RUNTIME ***/
function onFrame(event) {
  init();
  time += event.delta;
}


function init() {
  setCorners();
  renderPaths();
}

noise.seed(Math.random() * 500);

function setCorners() {
  for (var x = 0; x < columns; x++) {
    for (var y = 0; y < rows; y++) {
      cornerValues[x][y] = noise.perlin3(x * 0.3, y * 0.1, time + Math.cos(time))
    }
  }
}

function getCornerValues(x, y) {
  return [
    cornerValues[x][y],
    cornerValues[x + 1][y],
    cornerValues[x + 1][y + 1],
    cornerValues[x][y + 1]
  ]
}

function getBinaryCornerValues(x, y) {
  return [
    cornerValues[x][y] > 0 ? 1 : 0,
    cornerValues[x + 1][y] > 0 ? 1 : 0,
    cornerValues[x + 1][y + 1] > 0 ? 1 : 0,
    cornerValues[x][y + 1] > 0 ? 1 : 0
  ]
}

function getSquareState(corners) {
  var state = 0;
  for (var i = 0; i < corners.length; i++) {
    state += corners[i] * Math.pow(2, 3 - i);
  }
  return state;
}


function initializePaths() {
  for (var x = 0; x < columns - 1; x++) {
    for (var y = 0; y < rows - 1; y++) {
      paths[x][y] = new Path({
        segments: [
        ],
        points: [
          [x * resolution, y * resolution],
          [(x + 1) * resolution, y * resolution],
          [(x + 1) * resolution, (y + 1) * resolution],
          [x * resolution, (y + 1) * resolution]
        ]
      })
      paths[x][y].smooth({type: "continuous"})
    }
  }
}

function renderPaths() {
  for (var x = 0; x < columns - 1; x++) {
    for (var y = 0; y < rows - 1; y++) {
      var corners = getBinaryCornerValues(x, y);
      var squareState = getSquareState(corners);
      paths[x][y].segments = [];
      corners.forEach(function(corner, index) {
        if (corner === 1) {
          paths[x][y].add(paths[x][y].points[index])
          paths[x][y].fillColor = new Color(0.5, 0.04, 0.3, squareState / 16)
        }
      })
    }
  }
}

/*** HELPER METHODS ***/
function remap(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
