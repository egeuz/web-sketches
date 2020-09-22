
class Plane {
  constructor(point, axis1, axis1Length, axis2, axis2Length, resolution) {
    this.point = point;
    this.axis1 = {
      name: axis1,
      direction: axis1Length > 0 ? 1 : -1,
      length: Math.abs(axis1Length)
    }
    this.axis2 = {
      name: axis2,
      direction: axis2Length > 0 ? 1 : -1,
      length: Math.abs(axis2Length)
    }

    this.animationAxis = axis1 !== "height" && axis2 !== "height" ? "height" :
      axis1 !== "depth" && axis2 !== "depth" ? "depth" :
        axis1 !== "width" && axis2 !== "width" ? "width" : "";

    this.resolution = resolution;
    this.gap = resolution / 4;
    this.blocks = [];
  }

  init() {

    const blocks = [];
    let width, depth, height;
    let gap = this.resolution / 4;
    let currentPoint = this.point.copy();

    for (let ax2 = 0; ax2 < this.axis2.length; ax2 += 0) {
      //set current point to the first point at the cross axis
      currentPoint = getIsometricPointAt(this.point, ax2 * this.axis2.direction, this.axis2.name);

      for (let ax1 = 0; ax1 < this.axis1.length; ax1 += 0) {

        width = this.getLength("width", justSize);
        height = this.getLength("height", justSize);
        depth = this.getLength("depth", justSize);
        //create a new block out of the width/depth/height values;
        let block = new RectPrism(currentPoint, width, depth, height, randomHSB(ax1, ax2));
        blocks.push(block);
        //move to next point in axis direction
        let distance = (this.axis1.name === "width") ? width :
          (this.axis1.name === "depth") ? depth :
            (this.axis1.name === "height") ? height : 0;
        distance += gap;
        ax1 += distance;
        distance *= this.axis1.direction;
        let axis = this.axis1.name;

        let newPoint = getIsometricPointAt(currentPoint, distance, axis);
        currentPoint = newPoint;
      }

      let distance = (this.axis2.name === "width") ? width :
        (this.axis2.name === "depth") ? depth :
          (this.axis2.name === "height") ? height : 0;
      distance += gap;
      ax2 += distance;
    }

    this.blocks = blocks;
  }

  animate() {
    this.blocks.forEach(block => {
      let x = block.point.x;
      let y = block.point.y;
      let n = noise(x * frameCount * 0.0005, y * frameCount * 0.001, frameCount * 0.15);
      let length = block["base_" + this.animationAxis];
      n = map(n, 0, 1, length, length * 10);
      block[this.animationAxis] = n;
      // block[this.animationAxis] = block[this.animationAxis] * (n + 1);
    })
  }

  render() {
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      this.blocks[i].render();
    }
  }

  getLength(axis, callback) {
    if (axis === this.axis1.name || axis === this.axis2.name) {
      return callback(this)
    } else {
      return this.resolution;
    }
  }
}

//CALLBACK METHODS

function justSize(plane) {
  return plane.resolution;
}
function randomSize(plane) {
  return Math.floor(random(plane.resolution, plane.resolution * 1.5));
}

function noiseSize() {

}

//HELPER METHODS
function getIsometricPointAt(point, distance, axis) {
  if (axis === "width") {
    return createVector(
      point.x + distance / 2 * Math.sqrt(3),
      point.y + distance / 2
    )
  } else if (axis === "depth") {
    return createVector(
      point.x - distance / 2 * Math.sqrt(3),
      point.y + distance / 2
    )
  } else if (axis === "height") {
    return createVector(
      point.x,
      point.y + distance
    )
  }
}

function randomHSB(x, y) {
  return {
    hue: random(40, 100),
    saturation: 100 + x * -0.1 + y * -0.1,
    brightness: 100 + x * -0.1 + y * -0.1
  }
}