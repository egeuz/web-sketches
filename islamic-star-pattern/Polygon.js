class Polygon {
  constructor(x, y, radius, sides, angle = 60, delta = 0) {
    /** base properties **/
    this.center = createVector(x, y)
    this.radius = radius
    this.sides = sides
    this.delta = delta;
    /** geometric properties **/
    this.angle = radians(360 / sides)
    this.rotation = radians(-90)
    this.hankinAngle = radians(angle)
    /** coordinate arrays **/
    this.vertices;
    this.centers;
    this.edges;
    this.hankins;
  }

  init() {
    this.vertices = this.getVertices();
    this.edges = this.getEdges();
    this.centers = this.getCenters();
    this.hankins = this.getHankinLines();
    this.adjustHankinLines();
  }

  getVertices() {
    return new Array(this.sides).fill(0).map((v, i) => {
      let angle = this.angle * i + this.rotation;
      let x = this.center.x + cos(angle) * this.radius / 2;
      let y = this.center.y + sin(angle) * this.radius / 2;
      return createVector(x, y);
    })
  }

  getEdges() {
    return this.vertices.map((vertex, index) => {
      const prevVertex = (index === 0) ?
        this.vertices[this.vertices.length - 1] :
        this.vertices[index - 1]
      const edge = new Line(prevVertex, vertex)
      return edge
    })
  }

  getCenters() {
    return this.edges.map(edge => {
      return p5.Vector.add(edge.start, edge.end).mult(0.5)
    })
  }

  getHankinLines() {
    return this.centers
      .map((center, index) => {
        let edge = this.edges[index];

        let v1 = p5.Vector.sub(edge.start, center)
        let v2 = p5.Vector.sub(edge.end, center)
        let offset1 = center;
        let offset2 = center;

        if (this.delta > 0) {
          v1.setMag(delta);
          v2.setMag(delta);
          offset1 = p5.Vector.add(center, v1);
          offset2 = p5.Vector.add(center, v2);
        }
        v2.normalize()
        v1.normalize()

        v1.rotate(-this.hankinAngle)
        v2.rotate(this.hankinAngle)

        let p1 = p5.Vector.add(offset1, v1)
        let p2 = p5.Vector.add(offset2, v2)

        let h1 = new Line(offset1, p1, v1)
        let h2 = new Line(offset2, p2, v2)

        return [h1, h2]
      })
      .flat()
  }

  adjustHankinLines() {
    for (var i = 0; i < this.hankins.length; i++) {
      for (var j = 0; j < this.hankins.length; j++) {
        if (i !== j)
          this.hankins[i].findIntersection(this.hankins[j])
      }
    }
  }

  render() {
    this.edges.forEach(edge => { edge.render() })
    this.hankins.forEach(hankin => { hankin.render() })
  }
}

class Line {
  constructor(start, end, vector) {
    this.start = start
    this.end = end
    this.vector = vector
    this.intersect;
    this.prevD;
  }

  render() {
    line(
      this.start.x,
      this.start.y,
      this.end.x,
      this.end.y
    )
  }

  findIntersection(other) {
    const denominator = other.vector.y * this.vector.x - other.vector.x * this.vector.y;

    if (!denominator) return;

    const numa = other.vector.x * (this.start.y - other.start.y) - other.vector.y * (this.start.x - other.start.x);
    const numb = this.vector.x * (this.start.y - other.start.y) - this.vector.y * (this.start.x - other.start.x);
    const ua = numa / denominator;
    const ub = numb / denominator;
    const x = this.start.x + ua * this.vector.x;
    const y = this.start.y + ua * this.vector.y;

    if (ua > 0 && ub > 0) {
      let candidate = createVector(x, y);
      let distance1 = p5.Vector.dist(candidate, this.start)
      let distance2 = p5.Vector.dist(candidate, other.start)
      let sumDistance = distance1 + distance2;
      let diffDistance = abs(distance1 - distance2);

      if (diffDistance < 0.001) {
        if (!this.intersect) {
          this.intersect = candidate;
          this.end = candidate;
          this.prevD = sumDistance;
        } else if (sumDistance < this.prevD) {
          this.prevD = sumDistance;
          this.end = candidate;
          this.intersect = candidate;
        }
      }
    }
  }
}