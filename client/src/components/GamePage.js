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


  const Cards =[{
    "id": "647fbddef6f5bca74c4f26c7"
    ,
    "cardName": "Celestial Scalebearer",
    "offence": "20",
    "defence": "30",
    "health": "30",
    "image": CelestialScalebearer
  },{
    "id": "647fbddef6f5bca74c4f26c8"
    ,
    "cardName": "Dreadmaw Ravager",
    "offence": "40",
    "defence": "40",
    "health": "20",
    "image": DreadmawRavager
  },{
    "id": "647fbddef6f5bca74c4f26c9"
    ,
    "cardName": "Spectral Tidewarden",
    "offence": "80",
    "defence": "10",
    "health": "10",
    "image": SpectralTidewarden
  },{
    "id": "647fbddef6f5bca74c4f26ca"
    ,
    "cardName": "Towering Earthshaker",
    "offence": "0",
    "defence": "50",
    "health": "50",
    "image": ToweringEarthshaker
  },{
    "id": "647fbddef6f5bca74c4f26cb"
    ,
    "cardName": "Wasteland Devourer",
    "offence": "0",
    "defence": "50",
    "health": "50",
    "image": WastelandDevourer
  },{
    "id": "647fbddef6f5bca74c4f26cc"
    ,
    "cardName": "Abyssal Spellweaver",
    "offence": "60",
    "defence": "20",
    "health": "20",
    "image": AbyssalSpellweaver
  },{
    "id": "647fbddef6f5bca74c4f26cd"
    ,
    "cardName": "Forestbane Berserker",
    "offence": "40",
    "defence": "30",
    "health": "30",
    "image": ForestbaneBerserker
  },{
    "id": "647fbddef6f5bca74c4f26ce"
    ,
    "cardName": "Fungal Axemaster",
    "offence": "30",
    "defence": "30",
    "health": "40",
    "image": FungalAxemaster
  },{
    "id": "647fbddef6f5bca74c4f26cf"
    ,
    "cardName": "Mountainstride Warbringer",
    "offence": "40",
    "defence": "20",
    "health": "40",
    "image": Mountainstride
  },{
    "id": "647fbddef6f5bca74c4f26d0"
    ,
    "cardName": "Scorchfang",
    "offence": "30",
    "defence": "10",
    "health": "60",
    "image": Scorchfang
  }]

  const Deck = ["647fbddef6f5bca74c4f26c7","647fbddef6f5bca74c4f26c8","647fbddef6f5bca74c4f26c9","647fbddef6f5bca74c4f26ca","647fbddef6f5bca74c4f26cb"]
  const Deck2 = ["647fbddef6f5bca74c4f26d0","647fbddef6f5bca74c4f26cf","647fbddef6f5bca74c4f26ce","647fbddef6f5bca74c4f26cd","647fbddef6f5bca74c4f26cc"]


  const [gameOver,setGameOver] = useState(true)
  const [winner,setWinner] = useState('')
  const [turn,setTurn] = useState('')
  const [player1Spaces, setPlayer1Spaces] = useState(Array(4).fill(null));
  const [player2Spaces, setPlayer2Spaces] = useState(Array(4).fill(null));
  const [player1Deck, setPlayer1Deck] = useState(['card4', 'card5', 'card6']); // Replace with actual card data
  const [player2Deck, setPlayer2Deck] = useState(['card7', 'card8', 'card9']); 
  const [player1Hand, setPlayer1Hand] = useState(Deck); 
  const [player2Hand, setPlayer2Hand] = useState(Deck2); 
  
  const drawCard = () => {
    setPlayer1Hand(player1Hand + Deck.splice);
  };





  
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
        <div className="card" onClick={drawCard} >
          {/* Display cards for Player 1 */}
          {}
        </div>
        <h3>{username}'s Hand</h3>
        <div className="card-deck">
          {player1Hand.map((Deck) => (
            <div key={Cards.id} className="card">
              <img className="card" src={Cards.image} alt={Cards.cardname} />
            </div>
          ))}
        </div>
      </div>
      <div className="player-area">
        <h2>{username}1</h2>
        <div className="spaces">
          {player1Spaces.map((card, Deck) => (
            <div key={Cards.id} className="space">
              {Cards.image}
            </div>
          ))}
        </div>
      </div>
      <div className="player-area">
        <div className="spaces">
          {player2Spaces.map((card, index) => (
            <div key={Cards.id} className="space">
              {card}
            </div>
          ))}
        </div>
        <h2>{username}2</h2>
      </div>
      <div className="deck">
        <div className="card-deck">
          {player2Hand.map((Deck2) => (
            <div key={Cards.id} className="card">
              {Cards.image}
            </div>
          ))}
        </div>
        <h3>{username}'s Hand</h3>
        <div className="card">
          {/* Display cards for Player 2 */}
          {player2Deck}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
