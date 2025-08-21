import { useState, useEffect } from "react";
import { createDeck, drawCard, calculatePoints } from "../utils";
import { Link } from "react-router-dom";

export default function Game() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [status, setStatus] = useState("Jugando...");
  const [gameOver, setGameOver] = useState(false);
  const [revealDealer, setRevealDealer] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const newDeck = createDeck();
    const player = [drawCard(newDeck), drawCard(newDeck)];
    const dealer = [drawCard(newDeck), drawCard(newDeck)];
    setDeck(newDeck);
    setPlayerHand(player);
    setDealerHand(dealer);
    setStatus("Jugando...");
    setGameOver(false);
    setRevealDealer(false);
  };

  const handleHit = () => {
    if (gameOver) return;
    const newDeck = [...deck];
    const newCard = drawCard(newDeck);
    const newHand = [...playerHand, newCard];
    setDeck(newDeck);
    setPlayerHand(newHand);

    const points = calculatePoints(newHand);
    if (points > 21) {
      setStatus("💀 Te pasaste de 21. Pierdes.");
      setGameOver(true);
      setRevealDealer(true);
    }
  };

  const handleStand = () => {
    if (gameOver) return;
    let newDeck = [...deck];
    let dealer = [...dealerHand];

    while (calculatePoints(dealer) < 17) {
      dealer.push(drawCard(newDeck));
    }

    setDeck(newDeck);
    setDealerHand(dealer);

    const playerPoints = calculatePoints(playerHand);
    const dealerPoints = calculatePoints(dealer);

    if (dealerPoints > 21 || playerPoints > dealerPoints) {
      setStatus("🏆 ¡Ganaste!");
    } else if (dealerPoints === playerPoints) {
      setStatus("🤝 Empate");
    } else {
      setStatus("😔 La banca gana");
    }
    setGameOver(true);
    setRevealDealer(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-900 to-green-700 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">♠️ Blackjack 🎴</h1>

      <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
        {/* Dealer */}
        <div className="w-full text-center">
          <h2 className="text-xl font-semibold">👑 Banca</h2>
          <p className="mb-2">
            Total:{" "}
            {revealDealer ? calculatePoints(dealerHand) : "?"}
          </p>
          <div className="flex justify-center gap-2">
            {dealerHand.map((c, i) => (
              <div
                key={i}
                className="bg-black/50 px-3 py-4 rounded-xl shadow-md"
              >
                {revealDealer || i === 0 ? `${c.value} ${c.suit}` : "🂠"}
              </div>
            ))}
          </div>
        </div>

        {/* Player */}
        <div className="w-full text-center mt-6">
          <h2 className="text-xl font-semibold">🙋‍♂️ Tú</h2>
          <p className="mb-2">Total: {calculatePoints(playerHand)}</p>
          <div className="flex justify-center gap-2">
            {playerHand.map((c, i) => (
              <div
                key={i}
                className="bg-yellow-600 px-3 py-4 rounded-xl shadow-md"
              >
                {c.value} {c.suit}
              </div>
            ))}
          </div>
        </div>

        {/* Estado */}
        <p className="mt-6 text-2xl font-bold">{status}</p>

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          {!gameOver && (
            <>
              <button
                onClick={handleHit}
                className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl shadow hover:bg-yellow-400 transition"
              >
                ➕ Pedir carta
              </button>
              <button
                onClick={handleStand}
                className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl shadow hover:bg-red-400 transition"
              >
                ✋ Plantarse
              </button>
            </>
          )}
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl shadow hover:bg-blue-400 transition"
          >
            🔄 Reiniciar
          </button>
          <Link
            to="/"
            className="px-6 py-3 bg-gray-500 text-white font-bold rounded-xl shadow hover:bg-gray-400 transition"
          >
            ⬅️ Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
