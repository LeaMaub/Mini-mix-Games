import React from 'react';
import img1 from './images/1pendu.svg';
import img2 from './images/2pendu.svg';
import img3 from './images/3pendu.svg';
import img4 from './images/4pendu.svg';
import img5 from './images/5pendu.svg';
import img6 from './images/6pendu.svg';
import img7 from './images/7pendu.svg';
import img8 from './images/8pendu.svg';
import img9 from './images/9pendu.svg';
import img10 from './images/10pendu.svg';

const Hangman = ({ attempts }) => {
    return (
        <div className="hangman">
        <img src={img1} alt="pied" style={{ visibility: attempts >= 1 ? 'visible' : 'hidden' }} />
        <img src={img2} alt="poteau" style={{ visibility: attempts >= 2 ? 'visible' : 'hidden'}} />
        <img src={img3} alt="barre" style={{ visibility: attempts >= 3 ? 'visible' : 'hidden' }} />
        <img src={img4} alt="corde" style={{ visibility: attempts >= 4 ? 'visible' : 'hidden' }} />
        <img src={img5} alt="tête" style={{ visibility: attempts >= 5 ? 'visible' : 'hidden' }} />
        <img src={img6} alt="corps" style={{ visibility: attempts >= 6 ? 'visible' : 'hidden' }} />
        <img src={img7} alt="jambe" style={{ visibility: attempts >= 7 ? 'visible' : 'hidden' }} />
        <img src={img8} alt="jambe" style={{ visibility: attempts >= 8 ? 'visible' : 'hidden' }} />
        <img src={img9} alt="Bras" style={{ visibility: attempts >= 9 ? 'visible' : 'hidden' }} />
        <img src={img10} alt="Perdu" style={{ visibility: attempts >= 10 ? 'visible' : 'hidden' }} />
    </div>
    )
}


export default Hangman
