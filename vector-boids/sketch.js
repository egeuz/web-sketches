/*** INIT ***/
var mouse = view.center;
var boidCount = 150;
var boidRadius = 25;
var boids = createFlock(boidCount);
var deltaTime = 0;
noise.seed(Math.random());
// var ff = new FlowField(boidRadius);


function createFlock(amount) {
  var boids = [];

  for (var i = 0; i < amount; i++) {
    boids.push(new Boid(new Point(
      Math.random() * view.size.width,
      Math.random() * view.size.height
    ), boidRadius));
  }
  return boids;
}

/*** RUNTIME ***/
function onFrame(event) {
  boids.forEach(function (boid) {
    boid.run(boids);
    var red = remap(boid.path.position.x, 0, view.size.width, 0, 1);
    var blue = remap(boid.path.position.y, 0, view.size.height, 0, 1);
    boid.path.fillColor = new Color(red, 0.7, blue);
  })
}

function onMouseMove(event) {
  mouse = event.point;
}


/*** BOID CLASS ***/
function Boid(position, radius) {
  /* shape properties */
  this.path = new Path({
    segments: [
      [position.x, position.y + radius / 2],
      [position.x - radius / 2, position.y - radius],
      [position.x, position.y - radius * 1.5],
      [position.x + radius / 2, position.y - radius],
    ],
    fillColor: {
      hue: Math.random() * 200,
      saturation: 50,
      brightness: 10
    },
    applyMatrix: false,
  })

  /* physics properties */
  this.radius = radius;
  this.maxSpeed = 10;
  this.maxForce = 0.3;
  this.velocity = Point.random();
  this.acceleration = new Point();

  /* boid runtime */
  this.run = function (boids) {
    this.flock(boids);
    this.checkBorders();
    this.update();
  }

  /* reposition boid based on flocking calculations */
  this.update = function () {
    //Update and limit velocity to maxspeed
    this.velocity += this.acceleration;
    this.velocity.length = Math.min(this.maxSpeed, this.velocity.length);
    //Rotate the boid
    var delta = this.path.position - (this.path.position + this.velocity);
    this.path.rotation = (delta.angle + 90);
    //Move the boid
    this.path.position += this.velocity;
    //Reset acceleration
    this.acceleration *= 0;
  }

  /* autonomous agent functions */
  this.flock = function (boids) {
    var separation = this.separate(4, boids);
    var alignment = this.align(2, boids);
    var cohesion = this.cohesion(2, boids);
    var seek = this.seek(mouse);
    this.acceleration += separation + alignment + cohesion + seek;
  }

  //SEEK
  //seek and steer towards a target point
  this.seek = function (target) {
    //create vector between current and target position;
    var desired = target - this.path.position;
    //slowdown if you're close to the target
    var distance = desired.length;
    var slowdownThreshold = this.radius * 4;
    desired.length = distance < slowdownThreshold ?
      this.maxSpeed * distance / slowdownThreshold :
      this.maxSpeed;
    //alter current velocity towards desired position;
    var steer = desired - this.velocity;
    steer.length = Math.min(this.maxForce, steer.length);
    //return position
    return steer;
  }

  //SEPARATION
  //see if there are boids nearby and move away from them
  this.separate = function (modifier, boids) {
    var separationDistance = this.radius * 2;
    var steer = new Point(0, 0);
    var nearbyBoidCount = 0;

    for (var i = 0; i < boids.length; i++) {
      var other = boids[i];
      var difference = this.path.position - other.path.position;
      var distance = difference.length;
      if (distance > 0 && distance < separationDistance) {
        difference = difference.normalize();
        difference /= distance;
        steer += difference;
        nearbyBoidCount++;
      }
    }

    if (nearbyBoidCount > 0) steer /= nearbyBoidCount;

    if (steer.length > 0) {
      steer.length = this.maxSpeed;
      steer -= this.velocity;
      steer.length = Math.min(steer.length, this.maxForce);
    }

    return steer * modifier;
  }

  //ALIGNMENT
  //find the average velocity of nearby boids
  //i.e. the average point that nearby boids are heading towards
  //steer towards said position
  this.align = function (modifier, boids) {
    var alignDistance = this.radius * 4;
    var steer = new Point(0, 0);
    var nearbyBoidCount = 0;

    for (var i = 0; i < boids.length; i++) {
      var other = boids[i];
      var distance = this.path.position.getDistance(other.path.position);
      if (distance > 0 && distance < alignDistance) {
        steer += other.velocity;
        nearbyBoidCount++;
      }
    }

    if (nearbyBoidCount > 0) steer /= nearbyBoidCount;

    if (steer.length > 0) {
      steer.length = this.maxSpeed;
      steer -= this.velocity;
      steer.length = Math.min(steer.length, this.maxForce);
    }

    return steer * modifier;
  }

  //COHESION
  //find the average position of nearby boids
  //steer towards said position
  this.cohesion = function (modifier, boids) {
    var cohesionDistance = this.radius * 4;
    var sum = new Point(0, 0);
    var nearbyBoidCount = 0;

    for (var i = 0; i < boids.length; i++) {
      var other = boids[i]
      var distance = this.path.position.getDistance(other.path.position);
      if (distance > 0 && distance < cohesionDistance) {
        sum += other.path.position;
        nearbyBoidCount++;
      }
    }

    if (nearbyBoidCount > 0) {
      sum /= nearbyBoidCount;
      return this.seek(sum) * modifier;
    } else {
      return sum;
    }
  }

  this.checkBorders = function () {
    //solution from PaperJS tadpole example
    //http://paperjs.org/examples/tadpoles/
    //a.k.a. "ofc they're tadpoles this is a PG-13 library"
    var vector = new Point();
    var position = this.path.position;
    var radius = this.radius;
    var screen = view.size;

    if (position.x < -radius) {
      vector.x = screen.width + radius;
    }

    if (position.x > screen.width + radius) {
      vector.x = -screen.width - radius;
    }

    if (position.y < -radius) {
      vector.y = screen.height + radius;
    }

    if (position.y > screen.height + radius) {
      vector.y = -screen.height - radius;
    }
    if (!vector.isZero()) {
      this.path.position += vector;
    }
  }
}

/* HELPER METHODS */
function remap(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
