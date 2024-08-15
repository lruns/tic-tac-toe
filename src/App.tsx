import React, {useState} from 'react';
import './App.css';

function App() {
    const [actives, setActives] = useState(Array.from({length: 9}, (_) => ""));
    const [turn, setTurn] = useState(false)

    const elements = Array.from({length: 9}, (_, index) => (
        <div className="place" onClick={() => {
            const newActives = [...actives];
            newActives[index] = turn ? 'x' : "0";
            setTurn(!turn)
            setActives(newActives)
        }}>
            {actives[index]}
        </div>
    ));

    const winner = (
        <div>
            Player "X" is winner!
        </div>
    );

    return (
        <div className="container">
            <main>
                <header>
                    <h1>Tic Tac Toe</h1>
                </header>
                <div className="game-container">
                    {elements}
                </div>
                {winner}
            </main>
        </div>
    )
}

export default App;
