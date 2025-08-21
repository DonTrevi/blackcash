import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-900 to-green-700 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">♠️ Blackjack React 🎴</h1>
      <div className="bg-black/40 p-6 rounded-2xl shadow-lg max-w-xl text-center">
        <h2 className="text-2xl font-semibold mb-4">📜 Instrucciones</h2>
        <p className="mb-2">• El objetivo es llegar lo más cerca posible a 21 sin pasarse.</p>
        <p className="mb-2">• Puedes <b>Pedir carta</b> tantas veces quieras.</p>
        <p className="mb-2">• Si te pasas de 21, pierdes automáticamente.</p>
        <p className="mb-2">• Si te plantas, la banca juega y gana quien esté más cerca de 21.</p>
        <p className="mb-2">• Las figuras valen 10. El As vale 1 u 11.</p>
      </div>
      <Link
        to="/game"
        className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold rounded-2xl shadow-lg hover:bg-yellow-400 transition"
      >
        🎮 Jugar ahora
      </Link>
    </div>
  );
}
