let bubbles = []
let ctx
let clicked = false
const cords = {
  x: 0,
  y: 0
}

function setup() {
  ctx = createCanvas(windowWidth, windowHeight);
  // ctx.mouseMoved(radiusOnMouse)
  for (let i = 0; i < 500; i++) {
    let color = random(colors)
    let borderColor = random(colors.filter(clr => clr != color))
    bubbles.push(new Bubble(color, borderColor))
    bubbles[i].moves()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function mousePressed() {
  clicked = false
  for (let bubble of bubbles) {
    isIn = bubble.mouseInteract()
    if (isIn) {
      cords.x = bubble.pos.x
      cords.y = bubble.pos.y
      clicked = isIn
      break
    }
  }
  return clicked
}

function draw() {
  if (clicked) {
    translate(cords.x * -2, cords.y * -2)
    scale(3)
  }
  background('rgba(0,0,20,0.2)')
  for (let bubble of bubbles) {
    bubble.update()
    bubble.show()

    bubble.borders()
  }
}

const colors = [
  "#E84855",
  "#FF9B71",
  "#E2B33B",
  "#168AFE"
]