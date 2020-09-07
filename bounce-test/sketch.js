/*** RUNTIME ***/
var position = view.center;
var vector = new Point({
  angle: 360 * randomFloat(),
  length: randomFloat(1, 10)
})
var radius = randomInt(60, 120);
var ball = new Ball(radius, position, vector);

console.log(ball);

/*** BALL CLASS ***/
//todo: adapt into a reusable class, to be attached to any path object
//challenge: can't use ES6, so no classes. gotta learn the old fash way
function Ball(r, p, v) {
  /*** constructor ***/
  this.radius = r;
  this.point = p;
  this.vector = v;

  this.maxVector = 15;
  this.numberOfSegments = Math.floor(r / 3 + 2);

  this.path = new Path.Circle({
    center: view.center,
    radius: r,
    fillColor: "red",
    selected: true
  })

  
}



/*** HELPER METHODS ***/
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
  return Math.random() * (max - min + 1) + min
}




