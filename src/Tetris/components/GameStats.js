import React from 'react'
import './GameStats.css'

const GameStats = ({ gameStats }) => {
    const {level, points, record, linesCompleted, linesPerLevel} = gameStats
    const linesToLevel = linesPerLevel - linesCompleted

    return (
        <div>
            <ul className='GameStats GameStats__right'>
                <li>Niveau</li>
                <li className='value'>{level}</li>
                <li>Prochain niveau</li>
                <li className='value'>{linesToLevel}</li>
                <li>Points</li>
                <li className='value'>{points}</li>
                <li>Record</li>
                <li className='value'>{record}</li>
            </ul>

            <ul className='GameStats GameStats__left'>
                <li className='smalltTitle'>Contrôles</li>
                <li>Echap : Quitter</li>
                <li>Touche "P" : Pause</li>
                <li>Flèche du haut : Tourner</li>
                <li>Flèche de gauche : Gauche</li>
                <li>Flèche de droite: Droite</li>
            </ul>
        </div>
    )
}

export default React.memo(GameStats)