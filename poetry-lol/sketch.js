const poetryArea = document.querySelector("#poetry-area div");
const textInput = document.querySelector("#text-input");
const submit = document.querySelector("#submit");

textInput.focus();

const text = "I saw you earlier today when I looked out the window as I was getting some milk from the fridge you were chasing after a seagull who had absconded with your panini";
const maxWords = 5;

submit.addEventListener("click", () => {
  poetryArea.innerHTML = "";
  
  let poem = [];
  let words = textInput.value ? textInput.value.split(" ") : text.split(" ");
  console.log(words);

  while (words.length > maxWords) {
    const splitPoint = Math.floor(monteCarlo() * maxWords);
    const newLine = words.slice(0, splitPoint).join(" ");
    poem.push(newLine);
    words = words.slice(splitPoint);
  }
  poem.push(words.join(" "));

  poem.forEach(line => {
    poetryArea.innerHTML += `<h1>${line}</h1>`
  })
})


function monteCarlo() {
  while (true) {
    let r1 = Math.random();
    let probability = r1;
    let r2 = Math.random();
    if (r2 < probability) return r1;
  }
}