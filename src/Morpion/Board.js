import React from 'react';
import Square from './Square'

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            scoreX: 0, 
            scoreO: 0,
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        }, () => {
            const winnerObj = calculateWinner(this.state.squares);
            if (winnerObj && winnerObj.winner === 'X') {
                this.setState(prevState => ({ scoreX: prevState.scoreX + 1 }))
            } else if (winnerObj && winnerObj.winner === 'O') {
                this.setState(prevState => ({ scoreO: prevState.scoreO + 1 }))
            }
        })
    }

    renderSquare(i) {
        const winLine = this.state.winningLine || [];
        return (
            <Square 
            value={this.state.squares[i]}
            onClick={ () => this.handleClick(i) }
            highlight={winLine.includes(i)}
            />
        );
    }

    resetGame() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            winningLine: []
        })
    }

    isBoardFull() {
        for (let i = 0; i < this.state.squares.length; i++) {
            if (this.state.squares[i] === null) {
                return false;
            }
        }
        return true;
    }

    render() {
        const winnerObj = calculateWinner(this.state.squares);
        const isFull = this.isBoardFull();
        let status;
        let resetButton;
        
        if (winnerObj) {
            status = 'Le joueur ' + winnerObj.winner + ' a gagné, bravo !';
            resetButton = <button id='resetButton' onClick={ () => this.resetGame() }>La revanche ?</button>
        } else if (isFull) {
            status = 'Match nul';
            resetButton = <button id='resetButton' onClick={ () => this.resetGame() }>On réessaie !</button>
        } else {
            status = 'Prochain joueur : ' + (this.state.xIsNext ? 'X' : 'O');
            resetButton = null;
        }

        return (
            <div className='center'>
                <div className='status'>
                    {status}
                </div>
                <div className='score'>
                Joueur X : {this.state.scoreX} - Joueur O : {this.state.scoreO}
                </div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                {resetButton}
            </div>
        )
    }
}

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
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}

export default Board