import './Menu.css'

const Menu = ({onClick}) => {
    return (
        <div className='menu'>
            <h1>Tetris</h1>
            <button className="button" onClick={onClick}>
                Commencer
            </button>
        </div>
    )
}

export default Menu