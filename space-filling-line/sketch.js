var path = new Path({
  segments: [
    [300, 300],
    [600, 300],
    [600, 600],
    [300, 600]
  ],
  strokeWidth: 3,
  strokeColor: "red",
  closed: true
})

// function onFrame() {
  path.skew(60, 0)
// }

// var allLines = []
// var possibleDirections = [new Point(-1, 0), new Point(1, 0), new Point(0, 1), new Point(0, -1)];
// var step = 30;

// console.log(view.size.width);
// for (var i=0; i<1000; i++) {
//   var newLine = new SpaceFillingLine(allLines, new Point(Math.random() * view.size.width, Math.random() * view.size.height))
//   allLines.push(newLine);
// }


// function SpaceFillingLine(allPreviousLines, startPoint) {
//   this.anyIntersections = false;
//   this.currentPoint = startPoint;
//   this.allPreviousLines = allPreviousLines;
//   this.path = "";

//   // while(!this.anyIntersections) {
//     var direction = possibleDirections[randomInt(0, 4)]

//     this.path = new Path({
//       segments: [this.currentPoint, this.currentPoint + direction * step],
//       strokeColor: "#111"
//     })
//   // }

// }

// /** HELPER METHODS **/
// function randomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }