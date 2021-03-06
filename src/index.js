import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square(props) {
    return (
        <button className={"square" + (props.isWinner ? " winner" : "")} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function ResetButton(props) {
    return (
        <button onClick={props.onClick}>Start Over</button>
    );
}

class Board extends React.Component {
    // constructor() {
    //     super();
    //     this.state = this.getInitalState();
    // }

    state = this.getInitalState();
    
    renderSquare(i) {
        let winner = this.state.winner;
        let isWinner = false;
        if (winner && winner.winningLine.includes(i)) {
            isWinner = true;
        }
        return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleSquareClick(i)}
                isWinner={isWinner}
            />
        );
    }

    render() {
        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner.player;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <br/>
                <ResetButton onClick={() => this.handleResetClick()}/>
            </div>
        );
    }

    handleSquareClick(i) {
        const squares = this.state.squares.slice();
        let winner = this.state.winner;
        // if this square already has a value, do nothing
        if (squares[i] || winner) {
            return;
        } 

        // set the value of the clicked square
        let xIsNext = this.state.xIsNext;
        squares[i] = xIsNext ? 'X' : 'O';
        xIsNext = !xIsNext;

        // determine if someone has won
        winner = calculateWinner(squares);

        this.setState({
            squares: squares,
            xIsNext: xIsNext,
            winner: winner
        });
    } 
    
    handleResetClick() {
        if (!this.isGameActive() || window.confirm("Are you sure? This will clear the current game.")) {
            this.setState(this.getInitalState());
        }
    }

    getInitalState() {
        return {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null
        };
    }

    isGameActive() {
        return this.state.winner === null && this.state.squares.includes('X');
    }
}

class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}

// ========================================
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { 
                player: squares[a],
                winningLine: lines[i]
            };
        }
    }
    return null;
};

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
