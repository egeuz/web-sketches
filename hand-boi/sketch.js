hands = [];

var arm = {
  hand: ""
}

for (var i = 1; i <= 32; i++) {
  project.importSVG('./assets/hardcopy/' + i + '.svg', function (svg) {
    svg.position = [view.size.width / 2, view.size.height / 2]
    hands.push(svg)
    svg.remove()
    renderHand()
  })
}

function onMouseDown() {
  if (hands.length === 32) {
    var fingerConfig = getRandomFingers()
    hands.forEach(function(hand) { hand.remove() })
    hands[fingerConfig].addTo(project)

    // console.log(fingerConfig)
    // arm.hand.position = [view.size.width / 2, view.size.height / 2]
  }
}

function renderHand() {
  if (hands.length === 32) {
    var fingerConfig = getRandomFingers()
    hands.forEach(function(hand) { hand.remove() })
    hands[fingerConfig].addTo(project)
  }
}


//TRY ANOTHER PROGRAMMATIC APPROACH LATER

// project.importSVG('./assets/hand.svg', function(svg) {
//   console.log("hii")
//   console.log(svg)
//   svg.remove()
// })

function getRandomFingers() {
  return new Array(5)
    .fill(0)
    .map(function (_n, i) {
      return Math.random() > 0.5 ? Math.pow(2, i) : 0
    })
    .reduce(function (acc, val) {
      return acc + val
    })
}