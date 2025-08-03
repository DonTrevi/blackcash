export function calculateScore(hand) {
  let total = hand.reduce((sum, card) => sum + card.numericValue, 0);
  let aceCount = hand.filter(card => card.value === 'A').length;

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  return total;
}

export function isBust(hand) {
  return calculateScore(hand) > 21;
}

export function determineWinner(playerHand, dealerHand) {
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  if (playerScore > 21) return 'dealer';
  if (dealerScore > 21) return 'player';
  if (playerScore > dealerScore) return 'player';
  if (dealerScore > playerScore) return 'dealer';
  return 'draw';
}
