import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
// import { HTMLBackend } from 'react-dnd-html5-backend';
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

  const style = {
    backgroundImage: `url(${mainImage})`,
    backgroundSize: '100% 100%',
    minHeight:'100vh',
  };

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



  const Deck = ["647fbddef6f5bca74c4f26c7", "647fbddef6f5bca74c4f26c8", "647fbddef6f5bca74c4f26c9", "647fbddef6f5bca74c4f26ca", "647fbddef6f5bca74c4f26cb", "647fbddef6f5bca74c4f26cc", "647fbddef6f5bca74c4f26cd", "647fbddef6f5bca74c4f26ce", "647fbddef6f5bca74c4f26cf", "647fbddef6f5bca74c4f26d0"]
  const Deck2 = ["647fbddef6f5bca74c4f26c7", "647fbddef6f5bca74c4f26c8", "647fbddef6f5bca74c4f26c9", "647fbddef6f5bca74c4f26ca", "647fbddef6f5bca74c4f26cb"]
  // =============================================================================================================================================================


  const [selectedCard, setSelectedCard] = useState(null);
  const [lastCardDrawn, setLastCardDrawn] = useState(null);
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

  // const drawCard = (deck, hand) => {
  //   if (deck.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * deck.length);
  //     const drawnCard = deck[randomIndex];
  //     const updatedDeck = [...deck];
  //     updatedDeck.splice(randomIndex, 1);
  //     const updatedHand = [...hand, drawnCard];
  //     return { updatedDeck, updatedHand };
  //   }
  //   return { deck, hand };
  // };

  // const switchTurn = () => {
  //   setCurrentTurn(currentTurn === 1 ? 2 : 1);
  // };

  // useEffect(() => {
  //   if (currentTurn === 1) {
  //     const { updatedDeck, updatedHand } = drawCard(player1Deck, player1Hand);
  //     setPlayer1Deck(updatedDeck);
  //     setPlayer1Hand(updatedHand);
  //   } else if (currentTurn === 2) {
  //     const { updatedDeck, updatedHand } = drawCard(player2Deck, player2Hand);
  //     setPlayer2Deck(updatedDeck);
  //     setPlayer2Hand(updatedHand);
  //   }
  // }, [currentTurn]);



  // const handleCardSelection = (card) => {
  //   setSelectedCard(card);
  // };

  // const handleCardPlacement = (index) => {
  //   if (selectedCard) {
  //     if (currentTurn === 1 && !player1Spaces[index]) {
  //       const updatedSpaces = [...player1Spaces];
  //       updatedSpaces[index] = selectedCard;
  //       setPlayer1Spaces(updatedSpaces);
  //       setSelectedCard(null);
  //       switchTurn();
  //     } else if (currentTurn === 2 && !player2Spaces[index]) {
  //       const updatedSpaces = [...player2Spaces];
  //       updatedSpaces[index] = selectedCard;
  //       setPlayer2Spaces(updatedSpaces);
  //       setSelectedCard(null);
  //       switchTurn();
  //     }
  //   }
  // };


  const addCardToHand = (playerDeck, playerHand) => {
    if (playerDeck.length > 0 && playerHand.length < 4) {
      const drawnCard = playerDeck[0];

      // Remove the drawn card from the deck
      const updatedDeck = playerDeck.slice(1);
      // Add the drawn card to the hand
      const updatedHand = [...playerHand, drawnCard];

      return [updatedDeck, updatedHand];
    }
    return [playerDeck, playerHand];
  };

  const handlePlayerDeckClick = () => {
    if (!battleInProgress) {
      // Draw a card for each player
      const [updatedDeck1, updatedHand1] = addCardToHand(player1Deck, player1Hand);
      const [updatedDeck2, updatedHand2] = addCardToHand(player2Deck, player2Hand);
      setPlayer1Deck(updatedDeck1);
      setPlayer1Hand(updatedHand1);
      setPlayer2Deck(updatedDeck2);
      setPlayer2Hand(updatedHand2);
      setBattleInProgress(true);
    }
  };

  const displayBattleResult = () => {
    // Get the current health points of both players from the game state
    const player1Health = gameState.player1.health;
    const player2Health = gameState.player2.health;
  
    // Display the battle result based on the players' health points
    if (player1Health <= 0 && player2Health <= 0) {
      console.log("It's a draw!");
    } else if (player1Health <= 0) {
      console.log("Player 2 wins!");
    } else if (player2Health <= 0) {
      console.log("Player 1 wins!");
    } else {
      console.log("The battle continues...");
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

    // Update game state with starting hands and updated decks
    setPlayer1Hand(player1StartingHand);
    setPlayer2Hand(player2StartingHand);
    setPlayer1Deck(updatedPlayer1Deck);
    setPlayer2Deck(updatedPlayer2Deck);

    // ...existing code...

  };

  const gameState = {
    player1: {
      health: 100,
      cards: [],
      // Other player-specific properties
    },
    player2: {
      health: 100,
      cards: [],
      // Other player-specific properties
    },
    // Other game state properties
  };
  
  const updateGameState = (player1Health, player2Health, player1Spaces, player2Spaces) => {
    // Update player health points in the game state
    gameState.player1.health = player1Health;
    gameState.player2.health = player2Health;
  
    // Update the player's cards in the game state
    gameState.player1.cards = player1Spaces;
    gameState.player2.cards = player2Spaces;
  
  };
  

  const resolveBattle = () => {
    let player1TotalDamage = 0;
    let player2TotalDamage = 0;
    const battleResult = [];
    // Calculate the total damage inflicted by all cards in player1's space
    for (let i = 0; i < player1Spaces.length; i++) {
      const player1Card = player1Spaces[i];
      if (player1Card !== null) {
        player1TotalDamage += player1Card.attack;
      }
    }
  
    // Calculate the total damage inflicted by all cards in player2's space
    for (let i = 0; i < player2Spaces.length; i++) {
      const player2Card = player2Spaces[i];
      if (player2Card !== null) {
        player2TotalDamage += player2Card.attack;
      }
    }
  
    // Subtract the total damage from the opponent's health
    player2Health -= player1TotalDamage;
    player1Health -= player2TotalDamage;
  
    // Check if any player has reached zero health
    if (player2Health <= 0 && player1Health <= 0) {
      // It's a draw
      battleResult = 'Draw';
    } else if (player2Health <= 0) {
      // Player 1 wins
      battleResult = 'Player 1 wins!';
    } else if (player1Health <= 0) {
      // Player 2 wins
      battleResult = 'Player 2 wins!';
    } else {
      // The battle continues
      battleResult = 'The battle continues...';
    }
  
    // Update the game state and display the battle result
    updateGameState();
    displayBattleResult(battleResult);
  };

  const drawCard = () => {
    if (player1Deck.length > 0) {
      const [drawnCard, ...remainingDeck] = player1Deck;
      setPlayer1Hand([...player1Hand, drawnCard]);
      setPlayer1Deck(remainingDeck);
      console.log(remainingDeck)
      console.log(player1Hand)
    }
  };
  // ================================================================================================



  const playSpace = () => {
    if (player1Hand.length > 0) {
      const [playedSpace, ...remainingHand] = player1Hand;
      setPlayer1Spaces([...player1Spaces, playedSpace]);
      setPlayer1Hand(remainingHand);
      console.log(remainingHand)
      console.log(player1Spaces)
    }
  };








  // ================================================================================================
  return (
    <div className="game" style={style}>
      <div className="deck">
        <div className="card" >
          {<img src={CardBacks} alt={"cardbacks"} className="card" />}

        </div>
        <h3 style={{fontFamily:'SupernaturalKnight', color:'white'}}>{username}'s Deck</h3>
        <div className="card-deck">
          {player2Hand.map((card, index) => (
            <div key={index} className="card">
              <img src={CardBacks} alt={card.cardName} className="card" />
            </div>
          ))}
        </div>
      </div>
      <div className="player-area">
        {/* <h2 style={{fontFamily: 'SupernaturalKnight', color: 'white'}}>{username}'s Hand</h2> */}
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
            <div key={index} className="space">
              <img src={Cards[index].image} alt={Cards[index].cardName} className="card" />
            </div>
          ))}
        </div>
        {/* <h2 style ={{fontFamily: 'SupernaturalKnight', color: 'white'}}>{username}'s Hand</h2> */}
      </div>
      <div className="deck">
        <div className="card-deck" >
          {player1Hand.map((card, index) => (
            <div key={index} className="card" onClick={playSpace}>
              <img src={Cards[index].image} alt={Cards[index].cardName} className="card" />
            </div>
          ))}
        </div>
        <h3 style={{fontFamily: 'SupernaturalKnight', color: 'white'}}>{username}'s Deck</h3>
        <div className="card" onClick={drawCard}>
          {<img src={CardBacks} alt={"back of cards"} className="card" />}
          {setPlayer1Deck}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
