export function calculatePoints(hand) {
  let total = hand.reduce((sum, card) => sum + (card?.numericValue || 0), 0);
  let aceCount = hand.filter(card => card?.value === "A").length;

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  return total;
}

export function formatCard(card) {
  if (!card || !card.value || !card.suit) return "🂠";
  return `${card.value}${card.suit}`;
}
