let turtle, start, end, len, commands
const TOTAL_STEPS = 7

function setup() {
  createCanvas(windowWidth, windowHeight)
  background("#111")
  stroke(255)
  start = createVector(0, 600)
  end = createVector(width, 600)
  turtle = new Turtle(start.x, start.y)
  const startAngle = getAngle(start, end)
  turtle.turnTo(startAngle)
  commands = initCommands(TOTAL_STEPS)
  commands.forEach(command => { command() })
}

function initCommands(steps, commands) {
  const len = p5.Vector.dist(start, end)
  let move = len / (3 ** (TOTAL_STEPS - steps))

  let initialCommands = [
    () => { turtle.moveForward(move) },
    () => { turtle.turnLeft(60) },
    () => { turtle.moveForward(move) },
    () => { turtle.turnRight(120) },
    () => { turtle.moveForward(move) },
    () => { turtle.turnLeft(60) },
    () => { turtle.moveForward(move) },
  ]

  if (!commands) {
    commands = initialCommands;
  } else {
    commands = commands.map((command, index) =>
      index % 2 === 0 ? initialCommands : command
    ).flat()
  }

  if (steps !== 0) {
    return initCommands(steps - 1, commands)
  } else {
    return commands
  }
}

//from StackOverflow user Christian Mann https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
function getAngle(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const theta = Math.atan2(dy, dx) * 180 / Math.PI
  return theta
}