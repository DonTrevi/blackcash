const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Genera un mazo de 52 cartas
export function generateDeck() {
  const deck = [];

  for (let suit of suits) {
    for (let value of values) {
      let numericValue = value === 'A' ? 11
                        : ['J', 'Q', 'K'].includes(value) ? 10
                        : parseInt(value);

      deck.push({ value, suit, numericValue });
    }
  }

  return deck;
}

// Mezcla el mazo con algoritmo de Fisher-Yates
export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Extrae una carta del mazo
export function drawCard(deck) {
  if (deck.length === 0) return undefined;
  return deck.shift();
}
