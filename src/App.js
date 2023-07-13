import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import './App.css';
import Tictactoe from './Tic-Tac-Toe/Tictactoe';
import Gugudan from './Gugudan/Gugudan';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <h1>웹게임</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tictactoe">Tic-Tac-Toe</Link></li>
          <li><Link to="/gugudan">Gu-Gu-Dan</Link></li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<span>환영합니다.</span>} />
        <Route path="/tictactoe" element={<Tictactoe />} />
        <Route path="/gugudan" element={<Gugudan />} />
      </Routes>
    </div>
  );
}

export default App;
