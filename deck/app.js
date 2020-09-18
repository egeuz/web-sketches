const deckArea = document.getElementById("deck");
const matArea = document.getElementById("mat");

const suits = ["Clubs", "Diamonds", "Spades", "Hearts"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

/*** RUNTIME ***/
document.addEventListener("DOMContentLoaded", () => {
  let deck = new Deck();
  let mat = new Mat();
  deck.render();

  deckArea.addEventListener("click", () => {
    if (deck.cards.length === 0) deck.reset();
    let card = deck.drawCard();
    mat.addToMat(card);
    mat.render(); 
    deck.render();
  })
})

/*** CLASSES ***/
class Deck {
  constructor() {
    this.cardList = this.initialize();
    this.cards = this.shuffle(this.cardList);
  }

  initialize() {
    const cards = [];
    suits.forEach(suit => {
      numbers.forEach(number => {
        const card = new Card(suit, number)
        cards.push(card);
      })
    })
    return cards;
  }

  //array shuffling method from javascript.info
  //https://javascript.info/task/shuffle
  shuffle(array) {
    //make a shallow copy of the array
    array = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  reset() {
    this.cardList = this.initialize();
    this.cards = this.shuffle(this.cardList);
  }

  render() {
    deckArea.innerHTML = "";
    for (let i = 0; i < this.cards.length; i++) {
      deckArea.innerHTML += `<div class="card back" style="bottom: ${40 / 52 * i}px" />`
    }
  }

  drawCard() {
    //remove the first card in the array and return it
    return this.cards.shift();
  }
}

class Mat {
  constructor() {
    this.cards = [];
  }

  addToMat(card) {
    this.cards.unshift(card);
    if (this.cards.length > 4) {
      this.cards.pop();
    }
  }

  render() {
    matArea.innerHTML = "";
    for (let i = 0; i < this.cards.length; i++) {
      matArea.innerHTML += this.cards[i].render();
    }
  }
}

class Card {
  constructor(suit, number) {
    this.suit = suit;
    this.number = number;
  }

  render() {
    return `<div class="card ${this.getSuitColor()}">
      <h3 class="number">${this.number}</h3>
      <h3 class="suit">${this.getSuitSymbol()}</h3>
    </div>`
  }

  getSuitSymbol() {
    if (this.suit === "Spades") return "♠"
    if (this.suit === "Clubs") return "♣"
    if (this.suit === "Hearts") return "♥"
    if (this.suit === "Diamonds") return "♦"
  }

  getSuitColor() {
    return (this.suit === "Spades" || this.suit === "Clubs") ? "black" : "red";
  }
}