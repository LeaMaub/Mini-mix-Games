import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MiniaturePendu from './images/miniaturePendu.png';
import Pendu from './Pendu/Pendu';
import MiniatureMorpion from './images/miniatureMorpion.avif'
import Morpion from './Morpion/Morpion'
import CandyCrush from './CandyCrush/CandyCrush';
import MiniatureCandyCrush from './images/miniatureCandyCrush.avif'
import Tetris from './Tetris/Tetris'
import MiniatureTetris from './images/miniatureTetris.jpg'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/pendu" element={<Pendu />} />
                <Route path="/morpion" element={<Morpion />} />
                <Route path="/candycrush" element={<CandyCrush />} />
                <Route path="/tetris" element={<Tetris/>}/>
            </Routes>
        </Router>
    );
}

function HomePage() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Bienvenue sur mini-mix game !</h1>
                <p>À quoi jouerons-nous aujourd'hui ? Prêts pour battre de nouveaux records ?</p>
                <div className="game-list">
                    <Link to="/pendu">
                        <div className="game-thumbnail">
                            <img src={MiniaturePendu} alt="" />
                            <p>Jeu du pendu</p>
                        </div>
                    </Link>
                    {<Link to="/morpion">
                        <div className="game-thumbnail">
                            <img src={MiniatureMorpion} alt="" />
                            <p>Jeu du morpion</p>
                        </div>
                    </Link>}
                    {<Link to="/candycrush">
                        <div className="game-thumbnail">
                            <img src={MiniatureCandyCrush} alt="" />
                            <p>Jeu des bonbons</p>
                        </div>
                    </Link>}
                    {<Link to="/tetris">
                        <div className="game-thumbnail">
                            <img src={MiniatureTetris} alt="" />
                            <p>Tetris</p>
                        </div>
                    </Link>}
                </div>
            </header>
        </div>
    );
}

export default App;

