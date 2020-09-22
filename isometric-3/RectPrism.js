
class RectPrism {

  constructor(point, width, depth, height, baseColor) {
    this.point = point; //starting point (but where?)
    this.width = width; //x size
    this.depth = depth; //y size
    this.height = height; //z size
    //base xyz sizes, for animation
    this.base_width = width; 
    this.base_depth = depth; 
    this.base_height = height; 

    //color data
    let hue = baseColor.hue;
    let sat = baseColor.saturation;
    let bri = baseColor.brightness;
    this.baseColor = color(hue, sat, bri, 60);
    this.highlight = color(hue, sat - 5, bri + 5, 60);
    this.shadow = color(hue, sat + 3, bri - 3, 60);
  }

  render() {
    const [b1, b2, b3, b4] = this.getPlanePoints(this.point, this.width, this.depth);
    const [t1, t2, t3, t4] = this.getPlanePoints(p5.Vector.sub(this.point, createVector(0, this.height)), this.width, this.depth);

    fill(this.shadow);
    this.drawPlane(t1, t2, t3, t4); //draw top plane
    fill(this.baseColor);
    this.drawPlane(t4, t3, b3, b4); //draw left side plane
    fill(this.highlight);
    this.drawPlane(t3, t2, b2, b3); //draw right side plane
  }

  getPlanePoints(p, w, d) {
    return [
      createVector(p.x, p.y),
      createVector(
        p.x + w / 2 * Math.sqrt(3),
        p.y + w / 2
      ),
      createVector(
        p.x + (w / 2 * Math.sqrt(3)) - (d / 2 * Math.sqrt(3)),
        p.y + w / 2 + d / 2
      ),
      createVector(
        p.x - d / 2 * Math.sqrt(3),
        p.y + d / 2
      )
    ]
  }

  drawPlane(p1, p2, p3, p4) {
    beginShape()
    vertex(p1.x, p1.y)
    vertex(p2.x, p2.y)
    vertex(p3.x, p3.y)
    vertex(p4.x, p4.y)
    endShape(CLOSE)
  }

  getIsometricPointAt(p, distance, axis) {
    //relative to this.point
    // let p = this.point;
    let w = this.width;
    let d = this.depth;
    
    if (axis === "width") {
      return createVector(
        p.x + distance / 2 * Math.sqrt(3),
        p.y + distance / 2
      )
    }

    if (axis === "depth") {
      return createVector(
        p.x - distance / 2 * Math.sqrt(3),
        p.y + distance / 2
      )
    }

    if (axis === "height") {
      return createVector(
        p.x,
        p.y + distance
      )
    }
  }
}

