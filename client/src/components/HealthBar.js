import React from 'react';
import './css/gamepage.css'; // Import the CSS file for styling

const HealthBar = ({ currentHealth, maxHealth }) => {
  const healthBarWidth = (currentHealth / maxHealth) * 100 + '%';

  return (
    <div className="health-bar">
      <div className="health-bar-inner" style={{ width: healthBarWidth }}></div>
    </div>
  );
};

export default HealthBar;
