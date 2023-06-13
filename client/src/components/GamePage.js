import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './css/gamepage.css'; // Import the CSS file for styling
import './css/App.css'; // Importing fonts
import AbyssalSpellweaver from '../images/Creatures/AbyssalSpellweaver.png';
import AmethystBlazebug from '../images/Creatures/AmethystBlazebug.png';
import ArachnocrabTreeshell from '../images/Creatures/ArachnocrabTreeshell.png';
import BjornTheAxeFury from '../images/Creatures/BjornTheAxeFury.png';
import CelestialScalebearer from '../images/Creatures/CelestialScalebearer.png';
import ColossalVoidgaze from '../images/Creatures/ColossalVoidgaze.png';
import DreadmawRavager from '../images/Creatures/DreadmawRavager.png';
import EmberguardSentinel from '../images/Creatures/EmberguardSentinel.png';
import ForestbaneBerserker from '../images/Creatures/ForestbaneBerserker.png';
import GrimbeakCrownbearer from '../images/Creatures/GrimbeakCrownbearer.png';
import OcculoidTentaculus from '../images/Creatures/OcculoidTentaculus.png';
import WastelandDevourer from '../images/Creatures/WastelandDevourer.png';
import Mountainstride from '../images/Creatures/Mountainstride.png';
import SpectralTidewarden from '../images/Creatures/SpectralTidewarden.png';
import FungalAxemaster from '../images/Creatures/FungalAxemaster.png';
import Scorchfang from '../images/Creatures/Scorchfang.png';
import ToweringEarthshaker from '../images/Creatures/ToweringEarthshaker.png';
import CardBacks from '../images/page elements/back.PNG';
import mainImage from '../images/page elements/GameBackground.png';

const GamePage = () => {

  const [username, setUsername] = useState('');
  const [player1Health, setPlayer1Health] = useState(100);
  const [player2Health, setPlayer2Health] = useState(100);

  const Cards = [{
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26c7"
    },
    "cardName": "Celestial Scalebearer",
    "offence": "20",
    "defence": "30",
    "health": "30",
    "image": CelestialScalebearer
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26c8"
    },
    "cardName": "Dreadmaw Ravager",
    "offence": "40",
    "defence": "40",
    "health": "20",
    "image": DreadmawRavager
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26c9"
    },
    "cardName": "Spectral Tidewarden",
    "offence": "80",
    "defence": "10",
    "health": "10",
    "image": SpectralTidewarden
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26ca"
    },
    "cardName": "Towering Earthshaker",
    "offence": "0",
    "defence": "50",
    "health": "50",
    "image": ToweringEarthshaker
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26cb"
    },
    "cardName": "Wasteland Devourer",
    "offence": "0",
    "defence": "50",
    "health": "50",
    "image": WastelandDevourer
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26cc"
    },
    "cardName": "Abyssal Spellweaver",
    "offence": "60",
    "defence": "20",
    "health": "20",
    "image": AbyssalSpellweaver
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26cd"
    },
    "cardName": "Forestbane Berserker",
    "offence": "40",
    "defence": "30",
    "health": "30",
    "image": ForestbaneBerserker
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26ce"
    },
    "cardName": "Fungal Axemaster",
    "offence": "30",
    "defence": "30",
    "health": "40",
    "image": FungalAxemaster
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26cf"
    },
    "cardName": "Mountainstride Warbringer",
    "offence": "40",
    "defence": "20",
    "health": "40",
    "image": Mountainstride
  }, {
    "_id": {
      "$oid": "647fbddef6f5bca74c4f26d0"
    },
    "cardName": "Scorchfang",
    "offence": "30",
    "defence": "10",
    "health": "60",
    "image": Scorchfang
  }]
  // =============================================================================================================================================================


const style = {
    backgroundImage: `url(${mainImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
   
  };

  
  const Deck = ["647fbddef6f5bca74c4f26c7", "647fbddef6f5bca74c4f26c8", "647fbddef6f5bca74c4f26c9", "647fbddef6f5bca74c4f26ca", "647fbddef6f5bca74c4f26cb","647fbddef6f5bca74c4f26cc","647fbddef6f5bca74c4f26cd","647fbddef6f5bca74c4f26ce","647fbddef6f5bca74c4f26cf","647fbddef6f5bca74c4f26d0"]
  const Deck2 = ["647fbddef6f5bca74c4f26c7", "647fbddef6f5bca74c4f26c8", "647fbddef6f5bca74c4f26c9", "647fbddef6f5bca74c4f26ca", "647fbddef6f5bca74c4f26cb"]
// =============================================================================================================================================================


  const [selectedCard, setSelectedCard] = useState(null);
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState('')
  const [currentTurn, setCurrentTurn] = useState('')
  const [player1Spaces, setPlayer1Spaces] = useState(Array(4).fill(null));
  const [player2Spaces, setPlayer2Spaces] = useState(Array(4).fill(null));
  const [player1Deck, setPlayer1Deck] = useState(Deck); // Replace with actual card data
  const [player2Deck, setPlayer2Deck] = useState(Deck2);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [round, setRound] = useState(1);
  const [battleInProgress, setBattleInProgress] = useState(false);
  const [battleLog, setBattleLog] = useState([]);

  console.log(player1Deck)

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken.username);
    }
    startGame();
  }, []);

  const switchTurn = () => {
    setCurrentTurn(currentTurn === 1 ? 2 : 1);
    setBattleInProgress(false);
    setBattleLog([]);
  };


  const handleCardSelection = (card) => {
    setSelectedCard(card);
  };

  const handleCardPlacement = (index) => {
    if (selectedCard) {
      if (currentTurn === 1 && !player1Spaces[index]) {
        const updatedSpaces = [...player1Spaces];
        updatedSpaces[index] = selectedCard;
        setPlayer1Spaces(updatedSpaces);
        setSelectedCard(null);
        switchTurn();
      } else if (currentTurn === 2 && !player2Spaces[index]) {
        const updatedSpaces = [...player2Spaces];
        updatedSpaces[index] = selectedCard;
        setPlayer2Spaces(updatedSpaces);
        setSelectedCard(null);
        switchTurn();
      }
    }
  };

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = () => {
    // Shuffle player decks
    const shuffledPlayer1Deck = shuffle(player1Deck);
    const shuffledPlayer2Deck = shuffle(player2Deck);
  
    // Draw three cards for each player's hand
    const player1StartingHand = shuffledPlayer1Deck.slice(0, 3);
    const player2StartingHand = shuffledPlayer2Deck.slice(0, 3);
  
    // Remove drawn cards from player decks
    const updatedPlayer1Deck = shuffledPlayer1Deck.slice(3);
    const updatedPlayer2Deck = shuffledPlayer2Deck.slice(3);
  
    // Reset the player spaces
    setPlayer1Spaces(Array(4).fill(null));
    setPlayer2Spaces(Array(4).fill(null));
  
    // Update game state with starting hands and updated decks
    setPlayer1Hand(player1StartingHand);
    setPlayer2Hand(player2StartingHand);
    setPlayer1Deck(updatedPlayer1Deck);
    setPlayer2Deck(updatedPlayer2Deck); 
  
    // ...existing code...
  };
  


  useEffect(() => {
    // ...existing code...
  }, [ gameOver, player1Deck, player1Hand, player1Spaces, player2Deck, player2Hand, player2Spaces]);


  
  const drawCard = () => {
    if (player1Deck.length > 0) {
      const [drawnCard, ...remainingDeck] = player1Deck;
      setPlayer1Hand([...player1Hand, drawnCard]);
      setPlayer1Deck(remainingDeck);
      console.log(remainingDeck)
      console.log(player1Hand)
    }
  };

  return (
    <div className="game" style={style}>
      <div className="deck">
        <div className="card" >
          {<img src={CardBacks} alt={"cardbacks"} className="card"/>}
        </div>
        <h3>{username}'s Deck</h3>
        <div className="card-deck">
          {player2Hand.map((card, index) => (
            <div key={index} className="card">
              <img src={CardBacks} alt={Cards[index].cardName} className="card"/>

            </div>
          ))}
        </div>
      </div>
      <div className="player-area">
        <h2>{username}'s Hand</h2>
        <div className="spaces">
          {player2Spaces.map((card, index) => (
            <div key={index} className="space">
              {Cards.image}
            </div>
          ))}
        </div>
      </div>
      <div className="player-area">
        <div className="spaces">
          {player1Spaces.map((card, index) => (
            <div
            key={index}
            className={`space ${!card && selectedCard ? 'droppable' : ''}`}
            onClick={() => handleCardPlacement(index)}
          >
              <img src={Cards[index].image} alt={Cards[index].cardName} className="card"/>
            </div>
          ))}
        </div>
        <h2>{username}'s Hand</h2>
      </div>
      <div className="deck">
      <div className="card-deck">
          {player1Hand.map((card, index) => (
            <div
            key={index}
            className={`card ${selectedCard === card ? 'selected' : ''}`}
            onClick={() => handleCardSelection(card)}
          >
              <img src={Cards[index].image} alt={Cards[index].cardName} className="card"/>
            </div>
          ))}
        </div>
        <h3>{username}'s Deck</h3>
        <div className="card" onClick={drawCard}>
          {<img src={CardBacks} alt={"back of cards"} className="card"/>}
          {setPlayer1Deck}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
