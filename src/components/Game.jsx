import React, { useState, useEffect } from "react";
import {
  calculatePoints,
  formatCard
} from "../utils/helpers";
import { generateDeck, shuffleDeck, drawCard } from "../utils/Deck";

function Game() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const startGame = () => {
    const newDeck = shuffleDeck(generateDeck());

    const playerInitial = [drawCard(newDeck), drawCard(newDeck)];
    const dealerInitial = [drawCard(newDeck)];

    setDeck(newDeck);
    setPlayerHand(playerInitial);
    setDealerHand(dealerInitial);
    setPlayerPoints(calculatePoints(playerInitial));
    setDealerPoints(calculatePoints(dealerInitial));
    setGameOver(false);
    setMessage("");
  };

  const hit = () => {
    if (gameOver) return;

    const newDeck = [...deck];
    const newCard = drawCard(newDeck);
    const newHand = [...playerHand, newCard];
    const newPoints = calculatePoints(newHand);

    setDeck(newDeck);
    setPlayerHand(newHand);
    setPlayerPoints(newPoints);

    if (newPoints > 21) {
      endGame(newHand, dealerHand, newDeck, true);
    }
  };

  const stand = () => {
    if (gameOver) return;
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];

    while (calculatePoints(newDealerHand) < 17) {
      const newCard = drawCard(newDeck);
      newDealerHand.push(newCard);
    }

    const dealerFinalPoints = calculatePoints(newDealerHand);

    setDealerHand(newDealerHand);
    setDealerPoints(dealerFinalPoints);
    endGame(playerHand, newDealerHand, newDeck, false);
  };

  const endGame = (player, dealer, updatedDeck, isBust) => {
    const playerPts = calculatePoints(player);
    const dealerPts = calculatePoints(dealer);

    setDeck(updatedDeck);
    setGameOver(true);

    if (isBust) {
      setMessage("¡Te pasaste de 21! Pierdes.");
    } else if (dealerPts > 21 || playerPts > dealerPts) {
      setMessage("¡Ganaste!");
    } else if (playerPts < dealerPts) {
      setMessage("Perdiste.");
    } else {
      setMessage("Empate.");
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="text-center p-4 space-y-6 bg-green-700 text-white min-h-screen">
      <h1 className="text-4xl font-bold">BlackCash 🃏</h1>

      <div>
        <h2 className="text-2xl font-semibold">Tu mano:</h2>
        <p>{playerHand.map(formatCard).join(", ")}</p>
        <p>Puntos: {playerPoints}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Dealer:</h2>
        {gameOver ? (
          <>
            <p>{dealerHand.map(formatCard).join(", ")}</p>
            <p>Puntos: {dealerPoints}</p>
          </>
        ) : (
          <>
            <p>{dealerHand[0] ? formatCard(dealerHand[0]) : "???"}, ???</p>
            <p>Puntos: ???</p>
          </>
        )}
      </div>

      <div className="space-x-4">
        {!gameOver ? (
          <>
            <button
              onClick={hit}
              className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Pedir carta
            </button>
            <button
              onClick={stand}
              className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded"
            >
              Plantarse
            </button>
          </>
        ) : (
          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
          >
            Jugar otra vez
          </button>
        )}
      </div>

      {message && <p className="text-xl font-bold">{message}</p>}
    </div>
  );
}

export default Game;
