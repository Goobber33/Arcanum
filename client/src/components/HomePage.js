import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
    const pageVariants = {
      initial: {
        y: "100%",
        opacity: 0
      },
      animate: {
        y: "0%",
        opacity: 1
      },
      exit: {
        y: "-100%",
        opacity: 0
      }
    };
  
    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.5
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
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          style={style}
        >
      <h1>Welcome to the Homepage!</h1>
      <p>This is a basic homepage component.</p>
    </motion.div>
  );
};

export default HomePage;
