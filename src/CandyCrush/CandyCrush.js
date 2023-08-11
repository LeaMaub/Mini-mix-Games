import React, {useEffect, useState, useCallback} from 'react'
import './CandyCrush.css'
import ScoreBoard from './ScoreBoard'
import candyBlue from '../images/candyBlue.png'
import candyGreen from '../images/candyGreen.png'
import candyOrange from '../images/candyOrange.png'
import candyPurple from '../images/candyPurple.png'
import candyRed from '../images/candyRed.png'
import candyYellow from '../images/candyYellow.png'
import blank from '../images/blank.png'


// Définition de constantes pour la largeur de la grille de jeu et les différentes couleurs de bonbons
const width = 8
const candyColors = [
    candyBlue,
    candyGreen,
    candyOrange,
    candyPurple,
    candyRed,
    candyYellow
]

const CandyCrush = () => {
    // Utilisation du hook useState pour stocker l'état actuel du jeu
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [ scoreDisplay, setScoreDisplay] = useState(0)
    const [moves, setMoves] = useState(15)
    const [gameOver, setGameOver] = useState(false)
    const [highScore, setHighScore] = useState(Number(localStorage.getItem("highScore")) || 0);

     // Définition de différentes fonctions pour vérifier la présence de lignes ou de colonnes de bonbons de la même couleur
    const checkForColumnOfFour = useCallback(() => {
        // Ce bloc vérifie si une colonne de quatre bonbons identiques existe et augmente le score si c'est le cas
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 60)
                columnOfFour.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }, [currentColorArrangement, setScoreDisplay])

    const checkForRowOfFour = useCallback(() => {
        // Ce bloc vérifie si une ligne de quatre bonbons identiques existe et augmente le score si c'est le cas
        for (let i = 0; i < 64; i++) {
            const rownOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i))continue

            if (rownOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 60)
                rownOfFour.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }, [currentColorArrangement, setScoreDisplay])

    const checkForColumnOfThree = useCallback(() => {
        // Ce bloc vérifie si une colonne de trois bonbons identiques existe et augmente le score si c'est le cas
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 20)
                columnOfThree.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }, [currentColorArrangement, setScoreDisplay])

    const checkForRowOfThree = useCallback(() => {
        // Ce bloc vérifie si une ligne de trois bonbons identiques existe et augmente le score si c'est le cas
        for (let i = 0; i < 64; i++) {
            const rownOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i))continue

            if (rownOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 20)
                rownOfThree.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }, [currentColorArrangement, setScoreDisplay])

    // Fonction pour déplacer les bonbons dans la grille après une correspondance
    const moveIntoSquareBelow = useCallback(() => {
         // Ce bloc déplace les bonbons vers le bas dans la grille après une correspondance
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) === blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
            }
        }
    }, [currentColorArrangement])

    // Gestion des événements de glisser-déposer
    const dragStart = (e) => {
        // Cette fonction est déclenchée lorsque le glissement commence
        setSquareBeingDragged(e.target)
    }
    const dragDrop = (e) => {
        // Cette fonction est déclenchée lorsque l'objet est déposé
        setSquareBeingReplaced(e.target)
    }
    const dragEnd = () => {
        // Cette fonction est déclenchée lorsque le glissement se termine
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

        const validMoves = [
            squareBeingDraggedId -1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if (squareBeingReplacedId && 
            validMove && 
            (isARowOfThree ||isARowOfFour || isAColumnOfFour ||isAColumnOfThree)) {
                setSquareBeingDragged(null)
                setSquareBeingReplaced(null)
            } else {
                currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
                currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
                setCurrentColorArrangement([...currentColorArrangement])
            }

        if (validMove) {
            setMoves(moves -1) // Décremente le compteur de mouvements
        }
    }

    const newGame = () => {
        createBoard()
        setScoreDisplay(0)
        setMoves(15)
        setGameOver(false)
    }

    // Création de la grille de jeu avec des couleurs de bonbons aléatoires
    const createBoard = () => {
        // Création d'une nouvelle grille de jeu avec des couleurs
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
    }

    // Gestion de la création de la grille de jeu et de l'actualisation de l'état du jeu
    useEffect(() => {
        // Ce bloc de code est exécuté une fois au chargement du composant pour créer la grille de jeu
        createBoard()
    }, [])

    useEffect(() => {
        // Ce bloc de code est exécuté à chaque mise à jour du composant pour vérifier les correspondances et déplacer les bonbons
        const timer = setInterval(() => {
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    useEffect(() => {
        if (scoreDisplay > highScore) {
            setHighScore(scoreDisplay);
            localStorage.setItem("highScore", scoreDisplay);
        }
    }, [scoreDisplay, highScore]);

    useEffect(() => {
        if (moves === 0) {
            setGameOver(true)
        }
    }, [moves])

    if (gameOver) {
        return (
            <div className="candycrushHeader">
            <h1 className="titleCandy">Jeux des bonbons</h1>
            <div className='infoEndGame'>
                <h3>Score: <ScoreBoard score={scoreDisplay}/></h3>
                <h3>Meilleur score: <ScoreBoard score={highScore}/></h3>
                <button className='newGame' onClick={newGame}>Je veux battre mon record !</button>
            </div>
        </div>
    )
    } else {
        return (
            <div className="candycrushHeader">
                <h1 className="titleCandy">Jeux des bonbons</h1>
                <div className='gameInfo'>
                    <h3>Score: <ScoreBoard score={scoreDisplay}/></h3>
                    <h3>Mouvements restants: {moves}</h3>
                    <h3>Meilleur score: <ScoreBoard score={highScore}/></h3>
                </div>
                <div className='candycrushGame'>
                    <div className='gameBoard'>
                        {currentColorArrangement.map((candyColor, index) => (
                            <img
                            key={index} // Identifiant unique pour chaque case, utilisé par React pour suivre efficacement les éléments de la liste
                            src={candyColor} // Image source pour la couleur du bonbon ; chaque case est remplie avec une image de bonbon de couleur
                            alt={candyColor}
                            data-id={index} // Attribut de données personnalisé pour stocker l'index de la case
                            draggable={true} // Permet à l'élément d'être glissé
                            onDragStart={dragStart} // Gère l'événement de début de glissement, enregistre la case qui est en train d'être glissée
                            onDragOver={(e) => e.preventDefault()} // Empêche le comportement par défaut de l'événement "dragover" pour permettre le glissement
                            onDragEnter={(e) => e.preventDefault()} // Empêche le comportement par défaut de l'événement "dragenter" pour permettre le glissement
                            onDragLeave={(e) => e.preventDefault()} // Empêche le comportement par défaut de l'événement "dragleave" pour permettre le glissement
                            onDrop={dragDrop} // Gère l'événement de dépôt, enregistre la case où le bonbon est déposé
                            onDragEnd={dragEnd} // Gère l'événement de fin de glissement, réalise l'échange de bonbons et vérifie si un mouvement est valide
                        />
                        ))}
                    </div>
                </div>
            </div>
            
        )
    }
}


export default CandyCrush;