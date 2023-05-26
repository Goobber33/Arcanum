import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  const variants = {
    exit: { y: "100%", opacity: 0, transition },
    enter: { y: "0%", opacity: 1, transition }
  };

  const style = {
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={variants}
      style={style}
    >
      <h1>Welcome to the Homepage!</h1>
      <p>This is a basic homepage component.</p>
    </motion.div>
  );
};

export default HomePage;
