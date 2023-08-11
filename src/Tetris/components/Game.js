import Menu from './Menu'
import TetrisGame from './TetrisGame'
import { useGameOver } from '../hooks/useGameOver'


const Game = ({ rows, columns }) => {
    const [gameOver, setGameOver, resetGameOver] = useGameOver();

    const start = () => resetGameOver();

    return (
        <div className="Game">
            {gameOver ? (
                <Menu onClick={start} />
            ) : (
                <TetrisGame rows={rows} columns={columns} setGameOver={setGameOver} />
            )}
        </div>
    );
};

export default Game;