const generateButton = document.getElementById("generate-button")
const startInput = document.getElementById("start-input")
const lengthInput = document.getElementById("length-input")
const output = document.getElementById("output")

window.addEventListener("DOMContentLoaded", async () => {
  const sourceText = await getSourceText()
  generateButton.addEventListener("click", () => {
    const startPhrase = startInput.value
    const length = parseInt(lengthInput.value)
    const text = generateText(startPhrase, length, sourceText)
    renderText(text)
  })
})

const getSourceText = async () => {
  const response = await fetch("text.txt")
  const sourceText = await response.text()
  const sanitizedText = sanitizeText(sourceText)
  return sanitizedText
}

const sanitizeText = text => text
  .split("\n")
  .map(line =>
    line
      .slice(0, line.indexOf("("))
      .trim()
      .toLowerCase() + ","
  )

const generateText = (start, length, words) => {
  let text = start;
  for (let i = 0; i < length; i++) {
    let rng = random(0, words.length)
    let randomWord = words[rng]
    console.log(randomWord)
    if (i === length - 1) {
      randomWord = randomWord.slice(0, randomWord.length - 1) + "."
    }
    text += " " + randomWord
  }
  return text;
}

const renderText = text => {
  output.innerHTML = text;
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)