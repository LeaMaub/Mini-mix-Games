import React from 'react'
import './Tetris.css'
import Game from './components/Game'

export default function Tetris() {
	return(
	<div className="tetrisGame">
		<Game rows={20} columns={10} />
	</div>
	)
}