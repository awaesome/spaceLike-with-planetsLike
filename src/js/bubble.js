class Bubble {
  constructor(color, borderColor) {
    this.diameter = floor(random(1, 8))
    this.maxDiam = this.diameter
    this.pos = createVector(random(this.diameter, width - this.diameter), random(this.diameter, height - this.diameter))
    this.velocity = createVector()
    this.color = color
    this.borderColor = borderColor
    this.maxSpeed = random(0.1, 2)
    this.acc = createVector(random(-0.001, 0.001), random(-0.001, 0.001))
  }

  borders() {
    if (this.pos.x + this.diameter / 2 > width || this.pos.x - this.diameter / 2 < 0) {
      this.velocity.x = -this.velocity.x
    }
    if (this.pos.y + this.diameter / 2 > height || this.pos.y - this.diameter / 2 < 0) {
      this.velocity.y = -this.velocity.y
    }
  }

  moves() {
    setInterval(() => {
      this.acc = createVector(random(-0.01, 0.01), random(-0.01, 0.01))
    }, random(1, 2) * 1000)
  }

  mouseInteract() {
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y)
    let speed = this.maxSpeed
    if (d < this.diameter) { // needed + ~30 for zoomout
      if (abs(this.velocity.x) > 0.2 || abs(this.velocity.y) > 0.2) {
        this.maxSpeed /= 5
      }
      while (this.maxDiam < this.diameter * 15) {
        this.maxDiam += 2
      }
      return true
    }
    if (this.maxDiam > this.diameter || d > this.diameter) {
      this.maxSpeed = speed
      while (this.maxDiam > this.diameter) {
        this.maxDiam -= 2
      }
      return false
    }
  }

  update() {
    this.velocity.y = constrain(this.velocity.y, -this.maxSpeed, this.maxSpeed)
    this.velocity.x = constrain(this.velocity.x, -this.maxSpeed, this.maxSpeed)
    this.velocity.add(this.acc)
    this.pos.add(this.velocity)
  }

  show() {
    // this.mouseInteract() // for zoomout
    stroke(this.borderColor)
    fill("rgba(0,0,0,0)")
    ellipse(this.pos.x, this.pos.y, this.maxDiam / 2, this.maxDiam / 6)

    // fill(this.color)
    // noStroke()
    stroke(this.color)
    noFill()
    if (this.maxDiam > this.diameter) {
      ellipse(this.pos.x, this.pos.y, this.maxDiam - this.maxDiam * 0.65)
      fill(this.color)
      ellipse(this.pos.x, this.pos.y, this.maxDiam - this.maxDiam * 0.75)
      scale(0.5)
      translate(this.pos.x, this.pos.y)
    } else {
      ellipse(this.pos.x, this.pos.y, this.diameter)
    }
  }
}