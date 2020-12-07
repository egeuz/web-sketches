const generatedText = document.getElementById("generated-text")
const generateButton = document.getElementById("generate-button")

const sentence = {
  "start": "#[adj1:#adj#][adj2:#adj#][adj3:#adj#]sentence#",
  "sentence": "The #adj1# #adj2# #animal# #verb# #preposition# the #adj3# #animal#.",
  "adj": ["quick", "brown", "lazy", "preposterous", "fuzzy", "cold", "purple", "callous", "fantastic", "round", "rotund", "chunky", "short"],
  "animal": ["fox", "dog", "elephant", "cat", "leopard", "giraffe", "rhino", "hamster", "mouse", "turtle", "pangolin", "bat"],
  "verb": ["jumps", "skitters", "stomps", "stretches", "reads", "flies", "rolls", "prowls", "skulks"],
  "preposition": ["over", "on", "under", "next to", "with", "without", "behind", "in front of"]
}

generateButton.addEventListener("click", e => {
  const grammar = tracery.createGrammar(sentence)
  const result = grammar.flatten("#start#")
  generatedText.innerHTML = result;
})


// const story = {
//   "start": "#[hero:#character#]story#",
//   "story": "A #adjective# #hero# fights the #adjective# monster. Go #hero# go!",
//   "character": ["dragon", "unicorn", "knight"],
//   "adjective": ["dark", "quiet", "sleepy"]
// }



//OUR OWN CONTEXT FREE GRAMMAR
// const rules = {
//   "S": [["The", "N", "V"]],
//   "N": [["cat"], ["dog"]],
//   "V": [["meows"], ["barks"]],
// }

// const sentence = {
//   // "S": ["The quick brown"]
// }


// //expansion function
// function expand(start, expansion) {
//   if (rules[start]) {

//     const pick = random(rules[start])
//     console.log(rules[start])
//     pick.forEach(option => {
//       expand(option, expansion);
//     })
//   } else {
//     expansion.push(start);
//   }
//   return expansion.join(" ");
// }

// function setup() {
//   noCanvas();
//   const start = "S"
//   const expansion = [];
//   const result = expand(start, expansion);
//   console.log(result)
// }