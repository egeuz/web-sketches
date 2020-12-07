const generatedText = document.getElementById("generated-text")
const generateButton = document.getElementById("generate-button")

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("seedText.txt")
  const sourceText = await response.text()
  const lipsumModel = generateModel(sourceText)

  generateButton.addEventListener("click", () => {
    generatedText.innerHTML = generateText("Lorem", 50, lipsumModel)
  })
})

const sanitizeText = text =>
  text.split("\n").map(line =>
    line.slice(0, line.indexOf("(")).trim().toLowerCase() + ","
  )

//markov chain code from https://compform.net/text/
function generateModel(words) {
  words = words.split(" ")
  const model = {};
  words.forEach((word, index) => {
    if (index === words.length - 1) return;
    const nextWord = words[index + 1];
    if (!model[word])
      model[word] = [];
    model[word].push(nextWord)
  })
  return model;
}

function generateText(startText, length, model) {
  let output = startText;
  let currentWord = startText;
  for (let i = 0; i < length; i++) {
    // choose the next word by sampling from options in the model
    currentWord = sample(model[currentWord]);
    // append word to output
    output += " ";
    output += currentWord;
    // if we get to a word that ends with "." we are done.
    const last_character = currentWord.substr(currentWord.length - 1);
    if (last_character === ".") {
      break;
    }
  }
  return output;
}

function sample(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}