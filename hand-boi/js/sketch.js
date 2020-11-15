/*** LIST OF ASSETS ***/
var files = [
  "pinky-closed.svg",
  "ring-closed.svg",
  "middle-closed.svg",
  "index-closed.svg",
  "thumb-closed.svg",
  "pinky-open.svg",
  "ring-open.svg",
  "middle-open.svg",
  "index-open.svg",
  "thumb-open.svg",
  "palm.svg",
];



function onFrame() {
  if (hand.render) {
    // console.log("hi")
  }
}

function onMouseUp() {
  if (hand.components.length === files.length) {
    hand.update()
  }
}

var hand = {
  components: [],
  render: "",
  update: update,
  // getPart: getPart
}

function update() {
  var hand = this;
  var fingers = ["thumb", "index", "middle", "ring", "pinky"]
  var openFingers = []
  var closeFingers = []
  //get finger config
  fingers.forEach(function (finger) {
    var isOpen = Math.random() > 0.5
    if (isOpen) {
      finger = getPart(finger)
      openFingers.push(finger)
    } else {
      closeFingers.push(finger)
    }
  })

  var palm = getPart("palm")




  // openFingers = openFingers.map(function(finger) { return this.getPart(finger + "-open")})
  var joinedPalm = uniteFingers(palm, openFingers)
  console.log(joinedPalm)
  joinedPalm.position = [view.size.width / 2,
  view.size.height / 2]

  // console.log(palm)

  // console.log(openFingers)

  //assemble object

  function getPart(partName) {
    return hand.components.find(function (part) {
      return part.name === partName
    })
  }

}



function uniteFingers(palm, fingers) {
  var finger = fingers.shift()
  var newPalm = palm.unite(finger)

  if (fingers.length === 0) {
    return newPalm
  } else {
    return uniteFingers(newPalm, fingers)
  }
}

/*** IMPORT CONFIGURATION ***/
var handParts = [];
files.forEach(function (filename) {
  var url = './assets/' + filename;
  project.importSVG(url, function (svg) {
    var xpos = view.size.width / 2;
    var ypos = view.size.height / 2;


    if (filename === "thumb-open.svg") {
      // svg.opacity = 0.5;
      xpos -= 82;
      ypos += 20;
    }

    if (filename === "index-open.svg") {
      xpos -= 62;
      ypos -= 75;
    }

    if (filename === "middle-open.svg") {
      xpos -= 28;
      ypos -= 101;
    }

    if (filename === "ring-open.svg") {
      xpos += 15;
      ypos -= 90;
    }

    if (filename === "pinky-open.svg") {
      xpos += 55;
      ypos -= 60;
    }

    if (filename === "thumb-closed.svg") {
      // svg.opacity = 0.5;
      xpos -= 72;
      ypos += 10;
    }

    if (filename === "index-closed.svg") {
      xpos -= 50;
      ypos -= 48;
    }

    if (filename === "middle-closed.svg") {
      xpos -= 15;
      ypos -= 50;
    }

    if (filename === "ring-closed.svg") {
      xpos += 20;
      ypos -= 48;
    }

    if (filename === "pinky-closed.svg") {
      xpos += 55;
      ypos -= 46;
    }

    svg.remove()
    var part = new Path({
      // position: [xpos, ypos],
      segments: svg.children[1].segments,
      fillColor: "#fff",
      strokeColor: "#000",
      strokeWidth: 4,
      name: filename.replace(".svg", ""),
      closed: true
    })

    part.position = [xpos, ypos]
    part.remove()

    hand.components.push(part)
  })
})




function generateHandState() {

  //for each finger
  for (var i = 0; i < 5; i++) {

  }

}