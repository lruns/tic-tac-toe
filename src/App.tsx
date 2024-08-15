import React from 'react';
import './App.css';

type AppState = {
    board: Array<string>,
    turn: Turn,
    win: WinEnum,
}

enum Turn {
    Player0,
    PlayerX,
}

enum WinEnum {
    None,
    Draw,
    Player0,
    PlayerX,
}

/////////////
/// 0 1 2
/// 3 4 5
/// 6 7 8
/////////////

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

class App extends React.Component<{}, AppState> {

    initState: AppState = {
        board: Array.from({length: 9}, (_) => ""),
        turn: Turn.Player0,
        win: WinEnum.None,
    };

    constructor() {
        super({});
        this.state = {...this.initState}
    }

    nextTurn() {
        const turn = this.state.turn === Turn.Player0? Turn.PlayerX : Turn.Player0;
        this.setState({turn: turn});
    }

    setBoard(board: Array<string>) {
        this.setState({board: board});
    }

    makeTurn(index: number) {
        if (this.state.win || this.state.board[index] !== "") {
            return;
        }
        const newBoard = [...this.state.board];
        newBoard[index] = this.state.turn == Turn.PlayerX ? 'X' : "0";
        this.setState({win: this.checkWin(newBoard, this.state.turn)})
        this.setBoard(newBoard)
        this.nextTurn()
    }

    checkWin(newBoard: Array<string>, turn: Turn): WinEnum {
        const board = newBoard;
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                if (turn === Turn.Player0) {
                    return WinEnum.Player0;
                } else {
                    return WinEnum.PlayerX;
                }
            }
        }
        if (board.every(item => item !== "")) {
            return WinEnum.Draw;
        }

        return WinEnum.None; // Возвращаем null, если победителя нет
    }

    getGameCells() {
        return Array.from({length: 9}, (_, index) => (
            <div className="game-cell" onClick={() => this.makeTurn(index)}>
                {this.state.board[index]}
            </div>
        ));
    }


    getWinMessage() {
        let text = "";
        switch (this.state.win) {
            case WinEnum.Draw:
                text = "It's a draw!";
                break;
            case WinEnum.PlayerX:
                text = "Player X wins!";
                break;
            case WinEnum.Player0:
                text = "Player 0 wins!";
                break;
        }
        return (
            <div>
                <h2>{text}</h2>
                <button onClick={() => this.setState({...this.initState})}>
                    Play Again
                </button>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <main>
                    <header>
                        <h1>Tic Tac Toe</h1>
                    </header>
                    <div className="game-container">
                        {this.getGameCells()}
                    </div>
                    {this.state.win === WinEnum.None && (<>
                        Turn of the Player {this.state.turn == Turn.PlayerX ? 'X' : '0'}.
                    </>)}
                    {this.state.win !== WinEnum.None && this.getWinMessage()}
                </main>
            </div>
        )
    }
}

export default App;
