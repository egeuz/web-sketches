const files = [
  "thumb-open.svg",
  "palm.svg",
  // "pinky-closed.svg",
  // "ring-closed.svg",
  // "middle-closed.svg",
  // "index-closed.svg",
  // "thumb-closed.svg",
  // "pinky-open.svg",
  // "ring-open.svg",
  // "middle-open.svg",
  // "index-open.svg",
];

const hand = {
  update: update,
}

function update() {
  for (let i = 0; i < 5; i++) {

  }
}

window.addEventListener("DOMContentLoaded", async () => {
  paper.setup(document.getElementById("canvas"))
  
  const handParts =  importAssets(files)

})

 function importAssets(files) {
  const handParts = []
  const importSVG = promisify(paper.project.importSVG)

  // files.forEach(function (filename) {
  //   var url = './assets/' + filename;
  //   project.importSVG(url, function (svg) {
  //     var xpos = view.size.width / 2;
  //     var ypos = view.size.height / 2;


  //     if (filename === "thumb-open.svg") {
  //       // svg.opacity = 0.5;
  //       xpos -= 82;
  //       ypos += 20;
  //     }

  //     if (filename === "index-open.svg") {
  //       xpos -= 62;
  //       ypos -= 75;
  //     }

  //     if (filename === "middle-open.svg") {
  //       xpos -= 28;
  //       ypos -= 101;
  //     }

  //     if (filename === "ring-open.svg") {
  //       xpos += 15;
  //       ypos -= 90;
  //     }

  //     if (filename === "pinky-open.svg") {
  //       xpos += 55;
  //       ypos -= 60;
  //     }

  //     if (filename === "thumb-closed.svg") {
  //       // svg.opacity = 0.5;
  //       xpos -= 72;
  //       ypos += 10;
  //     }

  //     if (filename === "index-closed.svg") {
  //       xpos -= 50;
  //       ypos -= 48;
  //     }

  //     if (filename === "middle-closed.svg") {
  //       xpos -= 15;
  //       ypos -= 50;
  //     }

  //     if (filename === "ring-closed.svg") {
  //       xpos += 20;
  //       ypos -= 48;
  //     }

  //     if (filename === "pinky-closed.svg") {
  //       xpos += 55;
  //       ypos -= 46;
  //     }

  //     //adjust positions
  //     svg.children[0].remove();
  //     svg.name = filename.replace(".svg", "")
  //     svg.position = new Point(xpos, ypos)
  //     handParts.push(svg);
  //   })
  //   // var unite = handParts[1].unite(handParts[0])
  // })
}

