let sky;
function setup() {
  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER)
  sky = new Sky(50)
  sky.init()
}

function draw() {
  background("#111")
  sky.run()
}

class Sky {
  constructor(numstars) {
    this.stars = new Array(numstars).fill(0)
  }

  init() {
    this.stars = this.stars.map(s => {
      let x = random(width)
      let y = random(height)
      let size = random(10, 15)
      return new Star(x, y, size, size)
    })
    this.stars.forEach(star => {
      star.sky = this;
      star.init()
    })
  }

  addStar(star) {
    this.stars.push(star)
  }

  deleteStar(star) {
    const i = this.stars.indexOf(star)
    if (i > -1) {
      this.stars.splice(i, 1)
    }
  }

  run() {
    this.stars.forEach(star => {
      star.run()
    })
  }
}

class Star {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.age = 0
    this.lifespan = random(8000, 160000)
    this.state = ""
    this.color = 255
    this.opacity = 255
  }

  init() {
    this.setState()
  }

  run() {
    this.update()
    this.render()
  }

  update() {
    this.age += deltaTime
    this.setState()
  }

  render() {
    noFill()
    stroke(this.color, this.opacity)
    switch (this.state) {
      case 1:
        this.newStar()
        break;
      case 2:
        this.growingStar()
        break;
      case 3:
        this.brightStar()
        break;
      case 4:
        this.dyingStar()
        break;
      case 5:
        this.superNova()
        break;
      default:
        break;
    }
  }

  setState() {
    let s = this.age / this.lifespan
    this.state = (s >= 0 && s <= 0.25) ? 1 :
      (s > 0.25 && s <= 0.50) ? 2 :
        (s > 0.50 && s <= 0.75) ? 3 :
          (s > 0.75 && s < 1.00) ? 4 :
            (s >= 1) ? 5 :
              0
  }



  newStar() {
    const [w, h] = this.shimmer()
    this.renderStar(this.x, this.y, w, h)
  }

  growingStar() {
    //gradually grow the star's size
    this.width += deltaTime * 0.001
    this.height += deltaTime * 0.001
    //shimmering effect?
    const [w, h] = this.shimmer()
    //render the star
    this.renderStar(this.x, this.y, w, h)
  }

  brightStar() {
    this.width += deltaTime * 0.002
    this.height += deltaTime * 0.002
    const [w, h] = this.shimmer()
    this.renderStar(this.x, this.y, w, h)
    ellipse(this.x, this.y, w, h)
  }

  dyingStar() {
    this.width -= deltaTime * 0.004
    this.height -= deltaTime * 0.004
    //shimmering effect?
    const [w, h] = this.shimmer()
    //render the star
    this.renderStar(this.x, this.y, w, h)
    ellipse(this.x, this.y, w, h)
  }

  superNova() {

    this.width += deltaTime * 0.05
    this.height += deltaTime * 0.05

    this.opacity -= 2.5;
    ellipse(this.x, this.y, this.width, this.height)

    if (this.opacity === 0) {
      let numOfStars = randomInt(2, 4)
      for (let i = 0; i < numOfStars; i++) {
        let x = this.x + random(-100, 100)
        let y = this.y + random(-100, 100)
        let size = random(10, 20)
        let star = new Star(x, y, size, size)
        star.sky = this.sky
        this.sky.addStar(star)
      }
      this.sky.deleteStar(this)
    }
  }

  shimmer() {
    const freq = 0.005;
    const oscmin = 0.9;
    const oscmax = 1.1;
    const w = this.width * map(noise(millis() * freq), 0, 1, oscmin, oscmax);
    const h = this.height * map(noise(millis() * freq), 0, 1, oscmin, oscmax);
    return [w, h]
  }

  renderStar(x, y, w, h, angle = 0) {
    // get corner point of shape
    const c = createVector(x - w / 2, y - h / 2)

    //get edge points
    const p1 = createVector(w / 2, 0)
    const p2 = createVector(w, h / 2)
    const p3 = createVector(w / 2, h)
    const p4 = createVector(0, h / 2)

    //get midpoints
    const m1 = p5.Vector.lerp(p1, p2, 0.65)
    m1.x -= this.width / 6
    const m2 = p5.Vector.lerp(p2, p3, 0.35)
    m2.x -= this.width / 6
    const m3 = p5.Vector.lerp(p3, p4, 0.65)
    m3.x += this.width / 6
    const m4 = p5.Vector.lerp(p4, p1, 0.35)
    m4.x += this.width / 6

    //draw the star
    push()
    beginShape()
    translate(c.x, c.y)
    rotate(angle)
    noFill()
    vertex(p1.x, p1.y)
    vertex(m1.x, m1.y)
    vertex(p2.x, p2.y)
    vertex(m2.x, m2.y)
    vertex(p3.x, p3.y)
    vertex(m3.x, m3.y)
    vertex(p4.x, p4.y)
    vertex(m4.x, m4.y)
    endShape(CLOSE)
    pop()
  }
}

/*** HELPER METHODS ***/
function randomInt(min, max) {
  return floor(random(min, max))
}