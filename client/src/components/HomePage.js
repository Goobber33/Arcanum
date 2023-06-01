import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import mainImage from './test.png';

const HomePage = ({ onLogout }) => {
    const navigate = useNavigate();
    const [startClicked, setStartClicked] = useState(false);

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
        backgroundImage: `url(${mainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative'
    };

    const titleStyle = {
        fontFamily: "'VT323', monospace",
        fontSize: '4em',
        marginTop: '0',
        marginBottom: '20px',
        textAlign: 'center',
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '100%', 
        color: 'white'
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100%'
    };

    const logoutButtonStyle = {
        position: 'absolute',
        top: '100px',
        left: 'calc(40% + 70px)', 
        transform: 'translateX(-50%)'
    };

    const profileButtonStyle = {
        position: 'absolute',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)'
    };

    const startGame = () => {
        setStartClicked(true);
    }

    const cancelGame = () => {
        setStartClicked(false);
    }

    const buttonVariants = {
        hidden: { opacity: 0, y: "-100%" },
        visible: { opacity: 1, y: 0 },
    };

    const gameButtonStyle = {
        width: '150px',
        marginBottom: '10px'
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
            <h1 style={titleStyle}>Welcome to the Game!</h1>
            <button className="btn btn-primary" onClick={onLogout} style={logoutButtonStyle}>Logout</button>
            <button className="btn btn-primary" onClick={() => navigate('/profile')} style={profileButtonStyle}>Profile</button>
            <div style={containerStyle}>
                {!startClicked ? (
                    <div className="start-button" onClick={startGame}>
                        <span className="tooltip">Good Luck!</span>
                        <span>START</span>
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.button
                            className="btn btn-primary"
                            onClick={() => navigate('/create')}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            Create Game
                        </motion.button>
                        <motion.button
                            className="btn btn-primary"
                            onClick={() => navigate('/join')}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            Join Game
                        </motion.button>
                        <motion.button
                            className="btn btn-secondary"
                            onClick={cancelGame}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            Cancel
                        </motion.button>
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};

export default HomePage;
