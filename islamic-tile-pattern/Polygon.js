class Polygon {
  constructor(x, y, radius, sides, angle = 60) {
    this.center = createVector(x, y)
    this.radius = radius
    this.sides = sides
    this.angle = radians(360 / sides)
    this.rotation = radians(-90)
    this.hankinAngle = radians(angle)
    this.vertices = []
    this.centers = []
    this.edges = []
    this.hankins = []
  }

  init() {
    /*** INITIALIZE VERTEX POINTS ***/
    this.vertices = new Array(this.sides).fill(0).map((v, i) => {
      let angle = this.angle * i + this.rotation;
      let x = this.center.x + cos(angle) * this.radius / 2;
      let y = this.center.y + sin(angle) * this.radius / 2;
      return createVector(x, y);
    })
    /*** CREATE EDGES OUT OF VERTEX POINTS ***/
    this.edges = this.vertices.map((vertex, index) => {
      const prevVertex = (index === 0) ?
        this.vertices[this.vertices.length - 1] :
        this.vertices[index - 1]
      const edge = new Line(prevVertex, vertex)
      return edge
    })
    /*** CREATE CENTER POINTS OUT OF EDGES ***/
    this.centers = this.edges.map(edge => {
      return p5.Vector.add(edge.start, edge.end).mult(0.5)
    })
    /*** CREATE HANKINS LINES OUT OF CENTERS AND EDGES ***/
    this.hankins = this.centers.map((center, index) => {
      let edge = this.edges[index];

      let v1 = p5.Vector.sub(edge.start, center)
      v1.rotate(-this.hankinAngle)
      v1 = p5.Vector.add(center, v1)

      let v2 = p5.Vector.sub(edge.end, center)
      v2.rotate(this.hankinAngle)
      v2 = p5.Vector.add(center, v2)

      let h1 = new Line(center, v1)
      let h2 = new Line(center, v2)

      return [h1, h2]
    }).flat()

    for (var i = 0; i < this.hankins.length; i++) {
      for (var j = 0; j < this.hankins.length; j++) {
        if (i !== j) {
          getIntersection(this.hankins[i], this.hankins[j])
        }
      }
    }

    // const finalHankins = []

    // this.hankins.forEach((hankin, index) => {
    //   let total = this.hankins.length;
    //   let prevIndex = (index - 1 >= 0) ? index - 1 : total - 1;
    //   let nextIndex = (index + 1 < total) ? index + 1 : 0;

    //   console.log(index)
    //   console.log(prevIndex)
    //   console.log(nextIndex)
    //   let intersectingHankin = (index % 2 === 0) ?
    //     this.hankins[prevIndex] :
    //     this.hankins[nextIndex]

    //   let intersection = getIntersection(hankin, intersectingHankin)
    //   let center = hankin.start;

    //   finalHankins.push(new Line(center, intersection))
    // })

    // this.hankins = finalHankins

    // /*** ADJUST HANKINS LENGTHS TO INTERSECT W/ EACH OTHER PERFECTLY ***/
    // // this.hankins = this.hankins.map((hankin, index) => {

    // // })

  }

  render() {
    this.edges.forEach(edge => { edge.render() })
    // this.hankins.forEach(hankin => { hankin.render() })
    this.hankins[8].render();
  }
}

class Line {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  render() {
    line(
      this.start.x,
      this.start.y,
      this.end.x,
      this.end.y
    )
  }
}

function getIntersection(line1, line2) {
  //return false if the lines' lengths are 0
  if ((line1.start.x === line1.end.x && line1.start.y === line1.end.y) ||
    (line2.start.x === line2.end.x && line2.start.y === line2.end.y))
    return false

  //return false if the lines are parallel
  const denominator = ((line2.end.y - line2.start.y) * (line1.end.x - line1.start.x) - (line2.end.x - line2.start.x) * (line1.end.y - line1.start.y))

  if (denominator === 0) return false;

  let ua = ((line2.end.x - line2.start.x) * (line1.start.y - line2.start.y) - (line2.end.y - line2.start.y) * (line1.start.x - line2.start.x)) / denominator
  let ub = ((line1.end.x - line1.start.x) * (line1.start.y - line2.start.y) - (line1.end.y - line1.start.y) * (line1.start.x - line2.start.x)) / denominator

  //return false if the intersection is not along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false

  let x = line1.start.x + ua * (line1.end.x - line1.start.x)
  let y = line1.start.y + ua * (line1.end.y - line1.start.y)

  return createVector(x, y)

}