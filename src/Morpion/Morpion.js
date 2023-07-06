import React from 'react'
import './Morpion.css'
import Board from './Board'

class Morpion extends React.Component {
    render() {
        return (
                
            <div id='morpionGame'>
                <h1 id="morpionTitle">Morpion</h1>
                <div id='gameBoard'>
                    <Board />
                </div>
            </div>
        )
    }
}
//Rajouter player 1, player 2

export default Morpion