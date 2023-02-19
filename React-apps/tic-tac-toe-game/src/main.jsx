import React from 'react'
import ReactDOM from 'react-dom/client'
import { TicTacToeApp } from './TicTacToeApp';

import './TicTacToe.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TicTacToeApp />
  </React.StrictMode>
)
