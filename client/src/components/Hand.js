import React, { useState } from 'react';

const Hand = () => {
  const [playerHand, setPlayerHand] = useState([]);

  // Card data and functions to add cards to the hand

  return (
    <div>
      {playerHand.map((card) => (
        <div key={card.id} className="card">
          <img src={card.image} alt={card.name} />
          <h3>{card.name}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Hand;