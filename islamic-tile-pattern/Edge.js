
class Edge {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  render() {
    line(this.start.x, this.start.y, this.end.x, this.end.y)
  }

  hankin() {
    let mid = p5.Vector.add(this.start, this.end).mult(0.5)
    let v1 = p5.Vector.sub(this.start, mid);
    let v2 = p5.Vector.sub(this.end, mid);
  }

}