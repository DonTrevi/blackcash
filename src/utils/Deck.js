// Creamos un array con los palos de la baraja (♠, ♥, ♦, ♣)
const suits = ['♠', '♥', '♦', '♣'];

// Creamos un array con los valores de las cartas (A, 2–10, J, Q, K)
const values = [
  'A', '2', '3', '4', '5', '6', '7',
  '8', '9', '10', 'J', 'Q', 'K'
];

/**
 * Genera un mazo completo de 52 cartas (combinando valores y palos)
 * Cada carta será un objeto con: valor, palo y su valor numérico
 */
export function createDeck() {
  const deck = [];

  // Doble bucle para combinar cada valor con cada palo
  for (let suit of suits) {
    for (let value of values) {
      // Calculamos el valor numérico de la carta (útil para el puntaje)
      let numericValue = 0;

      if (value === 'A') numericValue = 11; // As vale 11 (o 1, lo ajustamos después)
      else if (['J', 'Q', 'K'].includes(value)) numericValue = 10; // Figuras valen 10
      else numericValue = parseInt(value); // Las demás cartas valen su número

      // Añadimos la carta al mazo
      deck.push({
        value,        // Ej: 'A'
        suit,         // Ej: '♠'
        numericValue  // Ej: 11
      });
    }
  }

  return deck; // Retorna un array con las 52 cartas
}

/**
 * Baraja el mazo usando el algoritmo de Fisher-Yates
 * Modifica el orden de las cartas de forma aleatoria
 */
export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    // Elegimos una posición aleatoria anterior
    const j = Math.floor(Math.random() * (i + 1));
    
    // Intercambiamos las posiciones de i y j
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck; // Devuelve el mazo barajado
}

/**
 * Reparte una carta del mazo (quita la primera carta y la devuelve)
 */
export function drawCard(deck) {
  return deck.shift(); // Remueve la primera carta del array y la retorna
}
