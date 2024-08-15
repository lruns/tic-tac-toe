import React, {useState} from 'react';
import './App.css';

function App () {
    const [actives, setActives] = useState(Array.from({length: 9}, (_) => "0"));


    const elements = Array.from({length: 9}, (_, index) =>
        (
            <div className="place" onClick={() => {
                const newActives = [...actives];
                newActives[index] = 'x';
                setActives(newActives)
            }}>
                {actives[index]}
            </div>
        )
    );

    return (
        <main>
            <div className="game-container">
                {elements}
            </div>
        </main>
    )
}

export default App;
