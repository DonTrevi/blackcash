import React, { useState, useEffect } from "react";
import { createDeck, drawCard } from "../utils/Deck";
import {
  calculateScore,
  isBust,
  determineWinner
} from "../utils/helpers";

function formatCard(card) {
  return `${card.value}${card.suit}`;
}

function Game() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const startGame = () => {
    const newDeck = createDeck(); // Crear mazo
    const playerInitial = [drawCard(newDeck), drawCard(newDeck)];
    const dealerInitial = [drawCard(newDeck)];

    setDeck(newDeck);
    setPlayerHand(playerInitial);
    setDealerHand(dealerInitial);
    setPlayerPoints(calculateScore(playerInitial));
    setDealerPoints(calculateScore(dealerInitial));
    setGameOver(false);
    setMessage("");
  };

  const hit = () => {
    if (gameOver) return;

    const newDeck = [...deck];
    const newCard = drawCard(newDeck);
    const newHand = [...playerHand, newCard];
    const newPoints = calculateScore(newHand);

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

    while (calculateScore(newDealerHand) < 17) {
      const newCard = drawCard(newDeck);
      newDealerHand.push(newCard);
    }

    const dealerFinalPoints = calculateScore(newDealerHand);
    setDealerHand(newDealerHand);
    setDealerPoints(dealerFinalPoints);
    endGame(playerHand, newDealerHand, newDeck, false);
  };

  const endGame = (player, dealer, updatedDeck, isBustFlag) => {
    const winner = determineWinner(player, dealer);

    setDeck(updatedDeck);
    setGameOver(true);

    if (isBustFlag) {
      setMessage("¡Te pasaste de 21! Pierdes.");
    } else {
      switch (winner) {
        case "player":
          setMessage("¡Ganaste! 🎉");
          break;
        case "dealer":
          setMessage("Perdiste. 😢");
          break;
        case "draw":
          setMessage("Empate. 🤝");
          break;
        default:
          setMessage("Error.");
      }
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
        <p>{playerHand.map(formatCard).join(" ")}</p>
        <p>Puntos: {playerPoints}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Dealer:</h2>
        {gameOver ? (
          <>
            <p>{dealerHand.map(formatCard).join(" ")}</p>
            <p>Puntos: {dealerPoints}</p>
          </>
        ) : (
          <>
            <p>{dealerHand[0] ? formatCard(dealerHand[0]) : "?"} ???</p>
            <p>Puntos: ???</p>
          </>
        )}
      </div>

      <div className="space-x-4">
        {!gameOver && (
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
        )}
        {gameOver && (
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
