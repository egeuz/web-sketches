class Automata {
  constructor(res) {
    this.resolution = res
    this.cells = new Array(Math.floor(width / res) + 1).fill(0).map(randomBinary)
    this.ruleset = new Array(8).fill(0).map(randomBinary)
    this.cellHistory = []
    this.generation = 0
  }

  generate() {
    let nextGeneration = new Array(this.cells.length)
      .fill(0)
      .map((cell, i) => {
        let left = i === 0 ? this.cells[this.cells.length - 1] : this.cells[i - 1]
        let middle = cell
        let right = i === this.cells.length - 1 ? this.cells[0] : this.cells[i + 1]
        let newState = this.rules(left, middle, right)
        return newState
      })
    this.cellHistory.push(this.cells)
    this.cells = nextGeneration
    this.generation++

    if (this.generation > height) this.reset()
  }

  reset() {
    this.ruleset = new Array(this.ruleset.length)
      .fill(0)
      .map(() => random() < 0.5 ? 0 : 1)
    
    background(0)
    this.generation = 0;
    this.cellHistory = [];
  }

  render() {
    this.cells.forEach((cell, x) => {
      let r = this.resolution
      let y = this.generation
      let fillColor = (cell === 0) ? 245 : 40;
      fill(fillColor)
      ellipse(x * r, y * r, r)
    })
  }

  rules(a, b, c) {
    return this.ruleset[parseInt(`${a}${b}${c}`, 2)]
  }
}