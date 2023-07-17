import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import './App.css';
import Tictactoe from './Tic-Tac-Toe/Tictactoe';
import Gugudan from './Gugudan/Gugudan';
import Followup from './Follow-Up/Followup';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <h1>웹게임</h1>
        <ul>
          <li><Link to="/tictactoe">Tic-Tac-Toe</Link></li>
          <li><Link to="/gugudan">구구단</Link></li>
          <li><Link to="/followup">끝말잇기</Link></li>
        </ul>
      </div>
      <div className="game">
        <Routes>
          <Route path="/tictactoe" element={<Tictactoe />} />
          <Route path="/gugudan" element={<Gugudan />} />
          <Route path="/followup" element={<Followup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
