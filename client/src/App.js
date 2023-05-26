import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const pageVariants = {
    exit: {
      y: "100vh",
      opacity: 0
    },
    enter: {
      y: "0",
      opacity: 1
    }
  };
  
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Router>
      <div className="App">
        <AnimatePresence mode='wait'>
          <Routes>
            <Route 
              path="/" 
              element={isLoggedIn 
                ? <Navigate to="/home" /> 
                : <LoginPage variants={pageVariants} transition={pageTransition} onLogin={handleLogin} />} 
            />
            <Route 
              path="/home" 
              element={isLoggedIn 
                ? <HomePage variants={pageVariants} transition={pageTransition} /> 
                : <Navigate to="/" />} 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
