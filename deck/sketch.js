let deck;
const suits = ["Clubs", "Diamonds", "Spades", "Hearts"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  background("#111");
  deck = new Deck();
}

function draw() {

}

function mousePressed() {
  var card = deck.drawCard();
  card.render();
}

class Deck {
  constructor() {
    this.cardList = this.initializeDeck();
    this.cards = this.shuffle(this.cardList);
  }

  initializeDeck() {
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

  drawCard() {
    //remove the first card in the array and return it
    return this.cards.shift();
  }
}

class Card {
  constructor(suit, number) {
    this.suit = suit;
    this.number = number;
  }

  render() {
    fill(255);
    rect(width / 2, height / 2, 80, 120);

    var suitColor = this.suit === "Clubs" || this.suit === "Spades" ? "#111" : "#ff3333"
    fill(suitColor);
    textSize(24);
    text(this.number, width / 2 - 30, height / 2 - 30);
    textSize(16);
    this.drawHeart(width / 2 - 60, height / 2 - 30)

  }

  drawHeart(x, y) {
    smooth();
    noStroke();
    translate(x, y);
    fill(255, 0, 0);
    beginShape();
    vertex(50, 15);
    bezierVertex(50, -5, 90, 5, 50, 40);
    vertex(50, 15);
    bezierVertex(50, -5, 10, 5, 50, 40);
    endShape();
  }

  drawClubs(x, y) {

  }

  drawSpades(x, y) {

  }

  drawDiamonds(x, y) {

  }
}