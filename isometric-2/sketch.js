let prism;
let plane = [];

function setup() {
  // colorMode(HSB, 100);
  createCanvas(windowWidth, windowHeight);
  background(5);
  let point = createVector(width / 2, height / 2);
  prism = new RectPrism(point, 15, 20, 50);
  prism.render();
}

function draw() {
  background(5);
  fill(255);
  stroke(5);
  prism.render();
}

function populatePlaneWithBlocks(startPoint, pWidth, pHeight) {

  let startPoint = createVector(width / 2, height / 2);
  let colWidth = 0;

  while(colWidth < pWidth) {
    
  }

}

class RectPrism {

  constructor(point, width, depth, height) {
    this.point = point; //starting point (but where?)
    this.width = width; //x size
    this.depth = depth; //y size
    this.height = height; //z size
  }

  render() {
    const [b1, b2, b3, b4] = this.getPlanePoints(this.point, this.width, this.depth);
    const [t1, t2, t3, t4] = this.getPlanePoints(p5.Vector.sub(this.point, createVector(0, this.height)), this.width, this.depth);

    fill(255, 0, 0)
    this.drawPlane(t1, t2, t3, t4); //draw top plane
    fill(0, 255, 0)
    this.drawPlane(t4, t3, b3, b4); //draw left side plane
    fill(0, 0, 255)
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

  getIsometricPointAt(distance, axis) {
    //relative to this.point
    let p = this.point;
    let w = this.width;
    let d = this.depth;
    
    if (axis = "width") {
      return createVector(
        p.x + distance / 2 * Math.sqrt(3),
        p.y + distance / 2
      )
    }

    if (axis = "depth") {
      createVector(
        p.x + distance / 2 * Math.sqrt(3),
        p.y + distance / 2
      )
    }
  }
}