
var pt = view.center;
var blobWidth = 100;
var blobHeight = 200;

var critter = new Critter();


function Critter() {
  this.position = view.center;
  this.color = randomHSB();
  this.width = random(150, 300);
  this.height = random(200, 400);

  this.body = new Path({
    segments: [
      [
        this.position.x - this.width / 2 * random(0.8, 1),
        this.position.y + random(-this.height/4, this.height/4)
      ],
      [
        this.position.x + random(-this.width/4, this.width/4),
        this.position.y - this.height / 2 * random(0.8, 1),
      ],
  
      [
        this.position.x + this.width / 2 * random(0.8, 1),
        this.position.y + random(-this.height/4, this.height/4)
      ],
      [
        this.position.x + random(-this.width/4, this.width/4),
        this.position.y + this.height / 2 * random(0.8, 1),
      ]
    ],
    fillColor: this.color,
    strokeColor: '#111',
    strokeWidth: 4,
    closed: true
  })

  this.smoothShapes = function() {
    this.body.smooth({type: "continuous"})
    this.mouth.smooth({type: "continuous"})
  }

  this.generateFace = function() {
    var facePoint = this.generateFacePoint();
    this.leftEye = new Path.Circle({
      center: [facePoint.x - 20, facePoint.y],
      radius: 5,
      fillColor: "#111",
    })
    this.rightEye = new Path.Circle({
      center: [facePoint.x + 20, facePoint.y],
      radius: 5,
      fillColor: "#111",
    })
    this.mouth = new Path({
      segments: [
        [facePoint.x - 10, facePoint.y + 20 + random(-15, 10)],
        [facePoint.x, facePoint.y + 20],
        [facePoint.x + 10, facePoint.y + 20 + random(-15, 10)]
      ],
      strokeWidth: 4,
      strokeColor: "#111"
    })
  }

  this.generateLegs = function() {
    var startLength = this.body.length - random(0, 100);
    // console.log(startLength);

    this.legs = [];

    for(var i = 0; i < 4; i++) {
      var point = this.body.getPointAt(startLength - i * 60);
      var leg = new Path.Rectangle({
        from: point - 10,
        to: point + new Point(20, 80),
        radius: 20,
        fillColor: this.color,
        strokeColor: '#111',
        strokeWidth: 4,
      })
      console.log("happen");
      this.legs.push(leg);
    }

  }


  this.generateFacePoint = function() {
    var facePoint = new Point(
      this.position.x - this.width / 2 * random(-1, 1),
      this.position.y - this.height / 2 * random(-1, 1)
    );

    if (this.body.contains(facePoint)) {
      return facePoint;
    } else {
      return this.generateFacePoint();
    }
  }

  //initialization
  
  this.generateFace();
  this.smoothShapes();
  this.generateLegs();

}

//helper methods
function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function randomInt(min, max) {
  return Math.floor(random(min, max));
}

function randomHSB() {
  return {
    hue: random(10, 90),
    saturation: random(0.3, 0.35),
    brightness: random(0.9, 1)
  }
}