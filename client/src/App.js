import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const RouteAnimations = ({ isLoggedIn, onLogin, onLogout }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.key} location={location}>
        <Route
          path="/"
          element={isLoggedIn
            ? <Navigate to="/home" />
            : <motion.div initial={{ y: "100vh", opacity: 0 }} animate={{ y: "0", opacity: 1 }} exit={{ y: "-100vh", opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 0.5 }}>
                <LoginPage onLogin={onLogin} />
              </motion.div>}
        />
        <Route
          path="/home"
          element={isLoggedIn
            ? <motion.div initial={{ y: "100vh", opacity: 0 }} animate={{ y: "0", opacity: 1 }} exit={{ y: "-100vh", opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 0.5 }}>
                <HomePage onLogout={onLogout} />
              </motion.div>
            : <Navigate to="/" />}
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <RouteAnimations isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
    </Router>
  );
};

export default App;
