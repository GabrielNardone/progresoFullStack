

import { calculateWinner } from "./calculateWinner";
import { Square } from "./Square";


export function Board({ xIsNext, square, onPlay }) {

    function handleClick(i) {
        if (square[i] || calculateWinner(square)) {
            return;
        }

        const nextSquare = square.slice();
        xIsNext ? nextSquare[i] = "X" : nextSquare[i] = 'O';

        onPlay(nextSquare);
    }

    const winner = calculateWinner(square);
    let status;
    winner ?
        status = 'Winner: ' + winner
        : status = "Next player: " + (xIsNext ? "X" : "O");



    return (
        <>
            <div className="titleBoard"> TIC-TAC-TOE GAME</div>


            <div className="board-row">
                <Square value={square[0]} onSquareClick={() => handleClick(0)} />
                <Square value={square[1]} onSquareClick={() => handleClick(1)} />
                <Square value={square[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={square[3]} onSquareClick={() => handleClick(3)} />
                <Square value={square[4]} onSquareClick={() => handleClick(4)} />
                <Square value={square[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={square[6]} onSquareClick={() => handleClick(6)} />
                <Square value={square[7]} onSquareClick={() => handleClick(7)} />
                <Square value={square[8]} onSquareClick={() => handleClick(8)} />
            </div>


            <div className="statusBoard">{status}</div>
        </>
    )
}



