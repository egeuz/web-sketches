let input, img, stamp;
let stampRadius = 25;

/*** P5 RUNTIME ***/
function setup() {
  pixelDensity(1)
  let w = window.innerWidth >= 800 ? 800 : window.innerWidth
  createCanvas(w, w).parent("canvas")
  setupFileInterface()
  ellipseMode(CENTER)
  pixelDensity(2)
}

function windowResized() {
  let w = window.innerWidth >= 800 ? 800 : window.innerWidth
  resizeCanvas(w, w)
}

function draw() {
  background("#333")

  if (img) {
    let [x, y, w, h] = getImageDimensions(img)
    image(img, x, y, w, h)


    if (mouseIsPressed) {

      let x = mouseX - stampRadius
      let y = mouseY - stampRadius

      if (keyIsDown(ALT)) {
        stamp = get(x, y, stampRadius * 2, stampRadius * 2)
      } else if (!stamp) {
        return;
      } else if (stamp) {
        cloneStamp(stamp)
      }
    }

    updatePixels()
    renderStampCursor()
  }
}

function mouseWheel(event) {
  stampRadius = (event.delta > 0) ? stampRadius + 0.5 :
    (event.delta < 0) ? stampRadius - 0.5 :
      stampRadius;
}

function setupFileInterface() {
  input = createFileInput(handleFileUpload)
  let span = createSpan("For best results, upload a 800 x 800 PNG")
  input.parent("controls-ul")
  span.parent("controls-ul")
  document
    .getElementById("image-download")
    .addEventListener("click", e => {
      save("from-ege-with-love.jpg")
    })
}

function handleFileUpload(file) {
  if (file.type === "image") {
    img = loadImage(file.data)
  } else {
    img = null;
  }
}

function getImageDimensions(img) {
  let x, y, w, h

  if (img.width > width) {
    h = height * img.height / img.width;
    w = width;
  }

  if (img.height > height) {
    w = width * img.width / img.height;
    h = height;
  }

  if (img.width <= width && img.height <= height) {
    w = img.width;
    h = img.height;
  }

  x = (width - w) / 2;
  y = (height - h) / 2;

  return [x, y, w, h]
}

function renderStampCursor() {
  let cursorSize = stampRadius * 2;
  noFill()
  stroke(255)
  push()
  blendMode(DIFFERENCE)
  ellipse(mouseX, mouseY, cursorSize, cursorSize)
  if (keyIsDown(ALT))
    ellipse(mouseX, mouseY, cursorSize - 10, cursorSize - 10)
  pop()
}

function cloneStamp() {
  for (let x = 0; x < stamp.width; x++) {
    for (let y = 0; y < stamp.height; y++) {
      let color = stamp.get(x, y)
      let canvasX = (mouseX - stampRadius) + x;
      let canvasY = (mouseY - stampRadius) + y;
      set(canvasX, canvasY, color)
    }
  }
}
