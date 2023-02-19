import { useState } from "react";
import { Board } from "./Board";


export const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0)
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const handlePlay = (nextSquare) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove);
    }


    const moves = history.map((square, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
          } else {
            description = 'Go to game start';
          }
        return (

            <li className="liInfo" key={move}>

                <button
                    className="gameInfoButton"
                    onClick={() => jumpTo(move)}
                >
                    {description}
                </button>
            </li>
        )
    })

    return (
        <section className="sectionMain">

            <div>
                <Board xIsNext={xIsNext} square={currentSquares} onPlay={handlePlay} />
            </div>

            <div className="gameInfo">
                <ul className="olInfo">{moves}</ul>
            </div>

        </section>
    );
}
