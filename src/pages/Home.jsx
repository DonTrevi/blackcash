// src/Home.jsx
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/game");
  };

  const handleInstructions = () => {
    alert("Instrucciones del juego:\n\nEn base a tu mano inicial (o sea, tus dos cartas) puedes optar con pedir otra carta o plantarte. Gana el juego el que tenga 21 puntos. PD: Los A's' (ases) valen 1 u 11");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a BlackCa$h. Disfrute su estadía.</h1>
      <div className="button-group">
        <button className="btn" onClick={handlePlay}>Jugar</button>
        <button className="btn" onClick={handleInstructions}>Instrucciones</button>
      </div>
    </div>
  );
}

export default Home;
