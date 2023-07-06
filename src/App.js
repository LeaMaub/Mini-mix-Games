import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MiniaturePendu from './images/miniaturePendu.png';
import Pendu from './Pendu/Pendu';
import MiniatureMorpion from './images/miniatureMorpion.avif'
import Morpion from './Morpion/Morpion'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/pendu" element={<Pendu />} />
                <Route path="/morpion" element={<Morpion />} />
            </Routes>
        </Router>
    );
}

function HomePage() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Bienvenue sur mon site de mini-jeux !</h1>
                <p>A quel jeu jouons nous aujourd'hui?</p>
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
                </div>
            </header>
        </div>
    );
}

export default App;

