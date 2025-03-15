import React, { useState } from 'react';
import './App.css';

function App() {
  const [teams, setTeams] = useState([
    { name: "Equipo 1", scores: [0, 0, 0, 0], total: 0 },
    { name: "Equipo 2", scores: [0, 0, 0, 0], total: 0 },
    { name: "Equipo 3", scores: [0, 0, 0, 0], total: 0 },
    { name: "Equipo 4", scores: [0, 0, 0, 0], total: 0 },
  ]);
  const [game, setGame] = useState(1); // Juego actual (1 a 4)

  const updateScores = (e) => {
    e.preventDefault();
    const form = e.target;
    const newTeams = teams.map(team => ({
      ...team,
      scores: [...team.scores],
    }));

    // Asignar puntajes según posiciones
    newTeams.find(t => t.name === form.first.value).scores[game - 1] = 500;
    newTeams.find(t => t.name === form.second.value).scores[game - 1] = 300;
    newTeams.find(t => t.name === form.third.value).scores[game - 1] = 200;
    newTeams.find(t => t.name !== form.first.value && t.name !== form.second.value && t.name !== form.third.value).scores[game - 1] = 0;

    // Actualizar totales y ordenar
    newTeams.forEach(team => team.total = team.scores.reduce((a, b) => a + b, 0));
    newTeams.sort((a, b) => b.total - a.total);
    setTeams(newTeams);
    setGame(prevGame => prevGame + 1); // Incrementar el juego siempre
  };

  const resetScores = () => {
    setTeams([
      { name: "Equipo 1", scores: [0, 0, 0, 0], total: 0 },
      { name: "Equipo 2", scores: [0, 0, 0, 0], total: 0 },
      { name: "Equipo 3", scores: [0, 0, 0, 0], total: 0 },
      { name: "Equipo 4", scores: [0, 0, 0, 0], total: 0 },
    ]);
    setGame(1); // Volver al Juego 1
  };

  return (
    <div className="App">
      <h1>Tabla de Posiciones</h1>
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Equipo</th>
            <th>Juego 1</th>
            <th>Juego 2</th>
            <th>Juego 3</th>
            <th>Juego 4</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.name} className={index === 0 && game > 4 ? 'winner' : ''}>
              <td>{index + 1}</td>
              <td>
                {team.name} {index === 0 && game > 4 && <span role="img" aria-label="trophy">🏆</span>}
              </td>
              <td>{team.scores[0]}</td>
              <td>{team.scores[1]}</td>
              <td>{team.scores[2]}</td>
              <td>{team.scores[3]}</td>
              <td>{team.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {game <= 4 ? (
        <form onSubmit={updateScores}>
          <h2>Ingresar resultados del Juego {game}</h2>
          <label>
            1er lugar (500 puntos):
            <select name="first">
              {teams.map(team => <option key={team.name} value={team.name}>{team.name}</option>)}
            </select>
          </label><br />
          <label>
            2do lugar (300 puntos):
            <select name="second">
              {teams.map(team => <option key={team.name} value={team.name}>{team.name}</option>)}
            </select>
          </label><br />
          <label>
            3er lugar (200 puntos):
            <select name="third">
              {teams.map(team => <option key={team.name} value={team.name}>{team.name}</option>)}
            </select>
          </label><br />
          <button type="submit">Actualizar</button>
        </form>
      ) : (
        <div>
          <h2>¡Competencia Finalizada!</h2>
          <p>El ganador es: {teams[0].name} con {teams[0].total} puntos</p>
          <button onClick={resetScores}>Limpiar y Reiniciar</button>
        </div>
      )}
    </div>
  );
}

export default App;