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
import io from 'socket.io-client';

let socket;

const GamePage = () => {

  const [username, setUsername] = useState('');
  const [opponentUsername, setOpponentUsername] = useState('');
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
    try {
      socket = io('https://arcanum.herokuapp.com');
      
      const token = localStorage.getItem('jwt');
      if (token) {
        const decodedToken = jwt_decode(token);
        setUsername(decodedToken.username);
        
        // emit your username to the server
        socket.emit('join', { username: decodedToken.username });
  
        // listen for 'newOpponent' event from server
        socket.on('newOpponent', (opponent) => {
          setOpponentUsername(opponent.username);
        });
  
        startGame();
      } else {
        throw new Error("Token not found in local storage.");
      }
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  }, []);   

  useEffect(() => {
    if (socket) {
      socket.on('cardPlacement', (data) => {
        const { player, index, card, board, hand } = data;
  
        if (player === 1) {
          setPlayer1Spaces(board);
          setPlayer1Hand(hand);
        } else if (player === 2) {
          setPlayer2Spaces(board);
          setPlayer2Hand(hand);
        }
      });
    }
  }, [socket]);
  

  const startNextRound = () => {
    setRound(round + 1);
    setBattleInProgress(false);
    setBattleLog([]);
  };

  const addCardToHand = (playerDeck, playerHand) => {
    if (playerDeck.length > 0 && playerHand.length < 4) {
      const drawnCard = playerDeck[0];
      const updatedDeck = playerDeck.slice(1);
      const updatedHand = [...playerHand, drawnCard];
      return [updatedDeck, updatedHand];
    }
    return [playerDeck, playerHand];
  };

  const handlePlayerDeckClick = () => {
    if (!battleInProgress) {
      const [updatedDeck1, updatedHand1] = addCardToHand(player1Deck, player1Hand);
      const [updatedDeck2, updatedHand2] = addCardToHand(player2Deck, player2Hand);
      setPlayer1Deck(updatedDeck1);
      setPlayer1Hand(updatedHand1);
      setPlayer2Deck(updatedDeck2);
      setPlayer2Hand(updatedHand2);
      setBattleInProgress(true);
    }
  };

  const handleCardPlacement = (player, index) => {
    if (battleInProgress && player === currentTurn && player === 1 && player1Spaces[index] === null) {
      const selectedCard = player1Hand[index];
      const updatedBoard = [...player1Spaces];
      updatedBoard[index] = selectedCard;
      const updatedHand = player1Hand.filter((_, i) => i !== index);
      setPlayer1Spaces(updatedBoard);
      setPlayer1Hand(updatedHand);
  
      // Emit the updated game state to the server
      socket.emit('cardPlacement', {
        player: 1,
        index,
        card: selectedCard,
        board: updatedBoard,
        hand: updatedHand
      });
    } else if (battleInProgress && player === currentTurn && player === 2 && player2Spaces[index] === null) {
      const selectedCard = player2Hand[index];
      const updatedBoard = [...player2Spaces];
      updatedBoard[index] = selectedCard;
      const updatedHand = player2Hand.filter((_, i) => i !== index);
      setPlayer2Spaces(updatedBoard);
      setPlayer2Hand(updatedHand);
  
      // Emit the updated game state to the server
      socket.emit('cardPlacement', {
        player: 2,
        index,
        card: selectedCard,
        board: updatedBoard,
        hand: updatedHand
      });
    }
  };
  

  const handleAttackDefenseSelection = (player, index, selection) => {
    if (battleInProgress && player === currentTurn && player === 1 && player1Spaces[index] !== null) {
      const updatedBoard = [...player1Spaces];
      updatedBoard[index].selection = selection;
      setPlayer1Spaces(updatedBoard);
    } else if (battleInProgress && player === currentTurn && player === 2 && player2Spaces[index] !== null) {
      const updatedBoard = [...player2Spaces];
      updatedBoard[index].selection = selection;
      setPlayer2Spaces(updatedBoard);
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
    const shuffledPlayer1Deck = shuffle(player1Deck);
    const shuffledPlayer2Deck = shuffle(player2Deck);
    const player1StartingHand = shuffledPlayer1Deck.slice(0, 3);
    const player2StartingHand = shuffledPlayer2Deck.slice(0, 3);
    const remainingPlayer1Deck = shuffledPlayer1Deck.slice(3);
    const remainingPlayer2Deck = shuffledPlayer2Deck.slice(3);
    setPlayer1Deck(remainingPlayer1Deck);
    setPlayer1Hand(player1StartingHand);
    setPlayer2Deck(remainingPlayer2Deck);
    setPlayer2Hand(player2StartingHand);
  };

  const resolveBattle = () => {
    // ...implement battle resolution logic...

    // Example: Just logging the battle results
    const battleResults = [];
    for (let i = 0; i < player1Spaces.length; i++) {
      const player1Card = player1Spaces[i];
      const player2Card = player2Spaces[i];

      if (player1Card !== null && player2Card !== null) {
        if (player1Card.selection === 'attack' && player2Card.selection === 'attack') {
          // Both Cards chose to attack
          // Update health points accordingly
          const player1HealthDiff = player2Card.offense - player1Card.defense;
          const player2HealthDiff = player1Card.offense - player2Card.defense;
          player1Card.health -= player1HealthDiff;
          player2Card.health -= player2HealthDiff;

          // ...implement additional battle resolution logic...
        } else if (player1Card.selection === 'attack' && player2Card.selection === 'defense') {
          // Player 1's Card attacks while Player 2's Card defends
          // Update health points accordingly

          // ...implement additional battle resolution logic...
        }

        // ...implement additional battle resolution logic...

        battleResults.push({
          player1Card,
          player2Card,
          // ...additional battle result details...
        });
      }
    }

    setBattleLog(battleResults);
    startNextRound();
  };


  useEffect(() => {
    // ...existing code...
  }, [currentTurn, gameOver, player1Deck, player1Hand, player1Spaces, player2Deck, player2Hand, player2Spaces]);


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



  useEffect(() => {
    if (socket) {
      socket.on('cardPlacement', (data) => {
        const { player, index, card, board, hand } = data;
  
        if (player === 1) {
          setPlayer1Spaces(board);
          setPlayer1Hand(hand);
        } else if (player === 2) {
          setPlayer2Spaces(board);
          setPlayer2Hand(hand);
        }
      });
    }
  }, [socket]);
  




  // ================================================================================================
  return (
    <div className="game" style={style}>
      <p>{username}</p>
      <div className="deck">
        <div className="card" >
          {<img src={CardBacks} alt={"cardbacks"} className="card" />}

        

        </div>
        <h3>{username}'s Deck</h3>
        <div className="card-deck">
          {player2Hand.map((card, index) => (
            <div key={index} className="card">
              <img src={CardBacks} alt={card.cardName} className="card" />
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
            <div key={index} className="space">
              <img src={Cards[index].image} alt={Cards[index].cardName} className="card" />
            </div>
          ))}
        </div>
        <h2>{username}'s Hand</h2>
      </div>
      <div className="deck">
        <div className="card-deck" >
          {player1Hand.map((card, index) => (
            <div key={index} className="card" onClick={playSpace}>
              <img src={Cards[index].image} alt={Cards[index].cardName} className="card" />
            </div>
          ))}
        </div>
        <h3>{username}'s Deck</h3>
        <div className="card" onClick={drawCard}>
          {<img src={CardBacks} alt={"back of cards"} className="card" />}
          {setPlayer1Deck}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
