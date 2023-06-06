import React, { useState } from 'react';
import './css/gamepage.css'; // Import the CSS file for styling

const GamePage = () => {
  const [player1Spaces, setPlayer1Spaces] = useState(Array(4).fill(null));
  const [player2Spaces, setPlayer2Spaces] = useState(Array(4).fill(null));
  const [player1Deck, setPlayer1Deck] = useState(['card1', 'card2', 'card3']); // Replace with actual card data
  const [player2Deck, setPlayer2Deck] = useState(['card4', 'card5', 'card6']); // Replace with actual card data
  const [player1Hand, setPlayer1Hand] = useState(['card7', 'card8', 'card9']); // Replace with actual card data
  const [player2Hand, setPlayer2Hand] = useState(['card10', 'card11', 'card12']); // Replace with actual card data

  return (
    <div className="game">
      <div className="deck">
        <h3>Player 1 Hand</h3>
        <div className="card">
          {/* Display a single card for Player 1 */}
          {player1Deck[0]}
        </div>
        <div className="card-deck">
          {player1Deck.map((card, index) => (
            <div key={index} className="card">
              {card}
            </div>
          ))}
        </div>
      </div>

      <div className="player-area">
        <h2>Player 1</h2>
        <div className="spaces">
          {player1Spaces.map((card, index) => (
            <div key={index} className="space">
              {card}
            </div>
          ))}
          
        </div>
        
      </div>

      <div className="player-area">
        <h2>Player 2</h2>
        <div className="spaces">
          {player2Spaces.map((card, index) => (
            <div key={index} className="space">
              {card}
            </div>
          ))}
        </div>
      </div>


      <div className="deck">
        <h3>Player 2 Hand</h3>
        <div className="card-deck">
          {player2Deck.map((card, index) => (
            <div key={index} className="card">
              {card}
            </div>
          ))}
        </div>
        <div className="card">
          {/* Display a single card for Player 2 */}
          {player2Deck[0]}
        </div>
      </div>
    </div>
  );
};

export default GamePage;

    
