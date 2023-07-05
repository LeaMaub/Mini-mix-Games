import React from 'react'
import './App.css';

const CurrentWord = ({currentWord, usedLetter, win}) => {
    const formattedWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
    return (
        <div id="currentWord">
            {
            formattedWord.split('').map(
                (letter, key) => {
                    let status = 'finded'

                    if (usedLetter.indexOf(letter.toLowerCase()) === -1 && usedLetter.indexOf(letter.toUpperCase()) === -1) {
                        if (win === -1) {
                            status = 'lost'
                        } else {
                            status ='notfinded'
                        }
                    }

                    return <span key={'letter_'+key}className={status}>
                        {status === 'finded' ? letter : 
                        (win === -1 ? letter : '_ ')
                        }
                    </span>
                    }
                )
            }
        </div>
    )
}

export default CurrentWord;
