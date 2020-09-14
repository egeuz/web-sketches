function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#111");

  const length = 1;
  const angle = 0.05;
  resetMatrix();
  translate(width / 2, height / 2);
  

  for (let i = 1; i < 10000; i++) {
    let n = i;
    let sequence = [];
    
    do {
      sequence.push(n);
      n = collatz(n);

    } while (n != 1);
    sequence.push(1);
    sequence.reverse();


    sequence.forEach(n => {
      if (n % 2 == 0) {
        rotate(angle + cos(n));
        stroke(125, 50, 250, n / i * 2);
        // stroke(255, 100, 100, n / i * 8);
      } else {
        rotate(angle + sin(n));
        stroke(255, 100, 100, n / i * 4);
        // stroke(125, 50, 250, n / i * 3);
      }
      strokeWeight(10);
      line(0, 0, 0, -length);
      translate(0, -length);
    })
  } 
}

function collatz(n) { 
  return n % 2 === 0 ? n / 2 : (n * 3 + 1) / 2;
}