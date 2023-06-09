import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './css/gamepage.css';
import './css/App.css';

const GamePage = () => {
  const [username, setUsername] = useState('');
  const cardData = [
    // card data array...
  ];
  const Deck = [
    // deck array...
  ];

  const [player1Spaces, setPlayer1Spaces] = useState(Array(4).fill(null));
  const [player2Spaces, setPlayer2Spaces] = useState(Array(4).fill(null));
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState(['card4', 'card5', 'card6']);
  const [player1Hand, setPlayer1Hand] = useState(['card7', 'card8', 'card9']);
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
          {/* {?} */}
        </div>
        <h3>{username}'s Hand</h3>
        <div className="card-deck">
          {player1Deck.map((card) => (
            <div key={card._id} className="card">
              <img src={card.image} alt={card.cardname} />
            </div>
          ))}
        </div>
      </div>
      <div className="player-area">
        <h2>{username}1</h2>
        <div className="spaces">
          {player1Spaces.map((card, Deck) => (
            <div key={Deck} className="space">
              {/* {card.image} */}
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
