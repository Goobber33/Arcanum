import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
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







const Deck = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
          const decodedToken = jwt_decode(token);
          setUsername(decodedToken.username);
        }
      }, []);
    
      const [playerDeck, setPlayerDeck] = useState([]);

  // Card data and functions to add cards to the Deck

  return (
    <div className="card">
          {/* Display cards for Player 1 */}
          {playerDeck[0]}
          <h3>{username}'s Deck</h3>
        </div>
  );
};

export default Deck;