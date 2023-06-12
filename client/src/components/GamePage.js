import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './css/gamepage.css'; // Import the CSS file for styling
import './css/App.css'; // Importing fonts
import AbyssalSpellweaver from '../images/AbyssalSpellweaver.png';
import AmethystBlazebug from '../images/AmethystBlazebug.png';
import ArachnocrabTreeshell from '../images/ArachnocrabTreeshell.png';
import BjornTheAxeFury from '../images/BjornTheAxeFury.png';
import CelestialScalebearer from '../images/CelestialScalebearer.png';
import ColossalVoidgaze from '../images/ColossalVoidgaze.png';
import DreadmawRavager from '../images/DreadmawRavager.png';
import EmberguardSentinel from '../images/EmberguardSentinel.png';
import ForestbaneBerserker from '../images/ForestbaneBerserker.png';
import GrimbeakCrownbearer from '../images/GrimbeakCrownbearer.png';
import OcculoidTentaculus from '../images/OcculoidTentaculus.png';
import WastelandDevourer from '../images/WastelandDevourer.png';
import Mountainstride from '../images/Mountainstride.png';
import SpectralTidewarden from '../images/SpectralTidewarden.png';
import FungalAxemaster from '../images/FungalAxemaster.png';
import Scorchfang from '../images/Scorchfang.png';
import ToweringEarthshaker from '../images/ToweringEarthshaker.png';

const GamePage = () => {

  const [username, setUsername] = useState('');


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

  const Deck = ["647fbddef6f5bca74c4f26c7", "647fbddef6f5bca74c4f26c8", "647fbddef6f5bca74c4f26c9", "647fbddef6f5bca74c4f26ca", "647fbddef6f5bca74c4f26cb"]


  const [gameOver, setGameOver] = useState(true)
  const [winner, setWinner] = useState('')
  const [turn, setTurn] = useState('')
  const [player1Spaces, setPlayer1Spaces] = useState(Array(4).fill(null));
  const [player2Spaces, setPlayer2Spaces] = useState(Array(4).fill(null));
  const [player1Deck, setPlayer1Deck] = useState(Cards); // Replace with actual card data
  const [player2Deck, setPlayer2Deck] = useState(['card4', 'card5', 'card6']);
  const [player1Hand, setPlayer1Hand] = useState(Deck);
  const [player2Hand, setPlayer2Hand] = useState(['card10', 'card11', 'card12']);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken.username);
    }
  }, []);

  return (
    <div className="game">
      <div className="deck">
        <div className="card">
          {/* Display cards for Player 1 */}
          {Deck}
        </div>
        <h3>{username}'s Hand</h3>
        <div className="card-deck">
          {player1Deck.map((card, index) => (
            <div key={index} className="card">
              <img src={card.image} alt={card.cardName} />
              <h4>{card.cardName}</h4>
              <p>Offense: {card.offence}</p>
              <p>Defense: {card.defence}</p>
              <p>Health: {card.health}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="player-area">
        <h2>{username}1</h2>
        <div className="spaces">
          {player1Spaces.map((card, Deck) => (
            <div key={Deck} className="space">
              {Cards.image}
            </div>
          ))}
        </div>
      </div>
      <div className="player-area">
        <div className="spaces">
          {player2Spaces.map((card, index) => (
            <div key={index} className="space">
              {card}
            </div>
          ))}
        </div>
        <h2>{username}2</h2>
      </div>
      <div className="deck">
        <div className="card-deck">
          {player2Deck.map((card, index) => (
            <div key={index} className="card">
              {card}
            </div>
          ))}
        </div>
        <h3>{username}'s Hand</h3>
        <div className="card">
          {/* Display cards for Player 2 */}
          {player2Deck[0]}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
