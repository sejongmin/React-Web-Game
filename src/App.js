import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import './App.css';
import Tictactoe from './Tic-Tac-Toe/Tictactoe';
import Gugudan from './Gugudan/Gugudan';
import Followup from './Follow-Up/Followup';
import Numberbaseball from './NumberBaseball/NumberBaseball';
import ResponseCheck from './ResponseCheck/ResponseCheck';
import RSP from './Rock-Scissors-Paper/RockScissorsPaper';
import Lotto from './Lotto/Lotto';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <h1>웹게임</h1>
        <ul>
          <li><Link to="/tictactoe">Tic-Tac-Toe</Link></li>
          <li><Link to="/gugudan">구구단</Link></li>
          <li><Link to="/followup">끝말잇기</Link></li>
          <li><Link to="/numberbaseball">숫자야구</Link></li>
          <li><Link to="/responsecheck">반응속도</Link></li>
          <li><Link to="/rockscissorspaper">가위바위보</Link></li>
          <li><Link to="/lotto">로또</Link></li>
        </ul>
      </div>
      <div className="game">
        <Routes>
          <Route path="/tictactoe" element={<Tictactoe />} />
          <Route path="/gugudan" element={<Gugudan />} />
          <Route path="/followup" element={<Followup />} />
          <Route path="/numberbaseball" element={<Numberbaseball />} />
          <Route path="/responsecheck" element={<ResponseCheck />} />
          <Route path="/rockscissorspaper" element={<RSP />} />
          <Route path="/lotto" element={<Lotto />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
