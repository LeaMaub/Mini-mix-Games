import React, {Component} from 'react'
import './App.css';
import Keyboard from './Keyboard';
import CurrentWord from './CurrentWord';
import Hangman from './Hangman';

class App extends Component {
  state = {
    wordCollection: [
    'chat', 'chien', 'souris', 'cheval', 'vache', 'poule', 'canard', 'abeille', 'mouton', 'chèvre',
    'lion', 'tigre', 'éléphant', 'papillon', 'serpent', 'ours', 'perroquet', 'pingouin', 'kangourou', 'girafe', 
    'rose', 'marguerite', 'orchidée', 'pissenlit', 'chêne', 'érable', 'cèdre', 'sapin', 'palmier', 'bambou', 
    'tulipe', 'lavande', 'hortensia', 'jonquille', 'mimosa', 'olivier', 'cyprès', 'pin', 'aubépine', 'myrtille'
    ],
    currentWord: null,
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(''),
    usedLetter: [],
    win: 0, // 0 neutre | -1 perdu | 1 gagné
    attempt: 0,
    maxAttempt: 10
  }

  componentDidMount() {
    window.addEventListener('keyup', (e) => {
      if(e.keyCode === 13) {
        this.initGame()
      }
  })
    //this.initGame()
  }

  getLetterVariants = (letter) => {
    const variants = {
      'a': ['a', 'à', 'â'],
      'e': ['e', 'é', 'è', 'ê', 'ë'],
      'i': ['i', 'î', 'ï'],
      'o': ['o', 'ô'],
      'u': ['u', 'ù', 'û', 'ü'],
      'c': ['c', 'ç'],
    };
  
    return variants[letter] || [letter];
  }
  
  clickLetter = (letter) => {
    const letterVariants = this.getLetterVariants(letter);
  
    const usedLetter = [...this.state.usedLetter];
  
    let foundNewLetter = false;
    for (const variant of letterVariants) {
      if (!usedLetter.includes(variant)) {
        usedLetter.push(variant);
        foundNewLetter = true;
      }
    }
  
    if (foundNewLetter) {
      let attempt = this.state.attempt;
      let win = 1; // true
  
      if (this.state.currentWord.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('').filter(l => l === letter).length === 0) {
        attempt++;
      }
  
      for (let i = 0; i < this.state.currentWord.length; i++) {
        if (!usedLetter.includes(this.state.currentWord[i])) {
          win = 0; // neutre
        }
      }
  
      if (attempt >= this.state.maxAttempt && win === 0 /*false*/) {
        win = -1; // false
      }
  
      this.setState({usedLetter, attempt, win});
    }
  }
  
  pickNewWord = () => {
    const randomIndex = Math.floor(Math.random() * this.state.wordCollection.length)
    return this.state.wordCollection[randomIndex]
  }

  initGame = () => {

    this.setState({
      currentWord: this.pickNewWord(), 
      usedLetter: [], 
      win:0, 
      attempt:0})
  }

  render() {
    return (
      <div id="game"> 
        <h1>Jeu du pendu</h1>

          {
          (this.state.currentWord !== null) && 
            <CurrentWord 
            currentWord={this.state.currentWord} 
            usedLetter={this.state.usedLetter}
            win={this.state.win}
            />
        }

        {
          (this.state.win === 0 && this.state.currentWord !== null) &&
          <Hangman
            attempts={this.state.attempt}
          />
        }

        {
          (this.state.win === 0 && this.state.currentWord !== null) &&
          <Keyboard 
          alphabet={this.state.alphabet}
          usedLetter={this.state.usedLetter}
          action={this.clickLetter}
          />
        }

        {
          this.state.win === 1 &&
          <p class="win">Bravo, vous avez trouvé !</p>
        }
        {
          this.state.win === -1 &&
          <p class="lost">Dommage... On en refait une ?</p>
        }

        {
          (this.state.currentWord === null || this.state.win !== 0) &&
          <button id="newGame" onClick={() => this.initGame()}>Nouvelle partie</button>
        }

      </div>
      
    )
  }
}

export default App;
