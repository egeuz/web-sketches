function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  drawRothko();
}

function draw() {
  background(0, 0, 0.4);
  
}

function drawRothko() {

  //pick a large swath of space, between 0.25 to 0.45 of the space, skewed higher
  
  var width = Math.max(
    random(0.85, 0.95), random(0.85, 0.95)).toFixed(2);
  
  var height = Math.max(
    random(0.25, 0.46), 
    random(0.25, 0.46)
  ).toFixed(2);
  
  
  
  console.log(height);
  
  
                        
}

function drawSquare() {

}