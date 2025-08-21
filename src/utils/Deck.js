const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export function createDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ value, suit });
    }
  }
  return shuffle(deck);
}

export function drawCard(deck) {
  return deck.pop();
}

export function calculatePoints(hand) {
  let points = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.value === "A") {
      points += 11;
      aces++;
    } else if (["J", "Q", "K"].includes(card.value)) {
      points += 10;
    } else {
      points += parseInt(card.value);
    }
  }

  while (points > 21 && aces > 0) {
    points -= 10;
    aces--;
  }

  return points;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
