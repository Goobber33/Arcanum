import React, { useState } from 'react';

const Hand = () => {
  const [playerHand, setPlayerHand] = useState([]);

  // Card data and functions to add cards to the hand

  return (
    <div className="card-deck">
          {playerHand.map((card, index) => (
            <div key={index} className="card">
              <img src={card.image} alt={card.cardName} className="card"/>
              <h4>{card.cardName}</h4>
              <p>Offense: {card.offence}</p>
              <p>Defense: {card.defence}</p>
              <p>Health: {card.health}</p>
            </div>
          ))}
        </div>
  );
};

export default Hand;