
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
    this.resolution = resolution;
    this.points = [];
    this.blocks = [];
  }

  init() {

    const blocks = [];
    let width, depth, height;
    let gap = 5;
    let ax2currentPoint = this.point.copy();
    let ax1currentPoint = this.point.copy();

    for (let ax2 = 0; ax2 < this.axis2.length; ax2 += 0) {

      ax2currentPoint = getIsometricPointAt(this.point, ax2 * this.axis2.direction, this.axis2.name);
      ax1currentPoint = ax2currentPoint.copy();

      for (let ax1 = 0; ax1 < this.axis1.length; ax1 += 0) {

        width = (this.axis1.name === "width" || this.axis2.name === "width") ?
          Math.floor(this.resolution + noise(ax1 * 0.001, ax2 * 0.001, frameCount * 0.001) * this.resolution) :
          // Math.floor(random(this.resolution, this.resolution * 1.5)) :
          this.resolution;
        if (width > this.axis1.length - ax1) {
          width = this.axis1.length - ax1;
        }
        depth = (this.axis1.name === "depth" || this.axis2.name === "depth") ?
          Math.floor(this.resolution + noise(ax1 * 0.003, ax2 * 0.003, frameCount * 0.001) * this.resolution) :
          // Math.floor(random(this.resolution, this.resolution * 1.5)) :
          this.resolution;
        if (depth > this.axis1.length - ax1) {
          depth = this.axis1.length - ax1;
        }
        height = (this.axis1.name === "height" || this.axis2.name === "height") ?
          Math.floor(this.resolution + noise(ax1 * 0.005, ax2 * 0.005, frameCount * 0.001) * this.resolution) :
          // Math.floor(random(this.resolution, this.resolution * 1.5)) :
          this.resolution;
          if (height > this.axis1.length - ax1) {
            height = this.axis1.length - ax1;
          }
        let block = new RectPrism(ax1currentPoint, width, depth, height);
        blocks.push(block);

        //move to next point in axis direction
        let distance = (this.axis1.name === "width") ? width :
          (this.axis1.name === "depth") ? depth :
            (this.axis1.name === "height") ? height : 0;
        distance += gap;
        ax1 += distance;
        distance *= this.axis1.direction;
        let axis = this.axis1.name;

        let newPoint = getIsometricPointAt(ax1currentPoint, distance, axis);
        ax1currentPoint = newPoint;

      }

      let distance = (this.axis2.name === "width") ? width :
        (this.axis2.name === "depth") ? depth :
          (this.axis2.name === "height") ? height : 0;
      distance += gap;
      ax2 += distance;
    }

    this.blocks = blocks;
  }

  render() {
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      this.blocks[i].render();
    }
  }

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