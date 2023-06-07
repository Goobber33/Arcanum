import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Game from "./Game"
import mainImage from './test.png';
import './css/App.css';
import ProfileButton from '../images/Profile.png';
import LogoutButton from '../images/Logout.png';
import StartButton from '../images/StartButton.png';

const HomePage = ({ onLogout }) => {
    const navigate = useNavigate();
    const [startClicked, setStartClicked] = useState(false);
    const [isCreatingGame, setIsCreatingGame] = useState(false);

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
        fontFamily: 'SellYourSoul',
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

    const startCreatingGame = () => {
        setIsCreatingGame(true);
    }

    const createGame = () => {
        // Here you can handle the creation of the game.
        // You will probably want to send a request to your server.
    }

    const cancelCreatingGame = () => {
        setIsCreatingGame(false);
    }

    const buttonVariants = {
        hidden: { opacity: 0, y: "-100%" },
        visible: { opacity: 1, y: 0 },
    };

    const gameButtonStyle = {
        width: '150px',
        marginBottom: '10px'
    };

    const smallerButtonStyle = {
        width: '100px',
        marginBottom: '10px'
    };

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '400px',
        height: '200px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.3)',
        padding: '20px',
        backgroundColor: '#2D2D2D',
        color: 'white'
    };

    const inputStyle = {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '5px',
        borderColor: '#333',
        backgroundColor: '#555',
        color: '#fff'
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
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
            <button className="btn" onClick={onLogout} style={logoutButtonStyle}><img src={LogoutButton}/></button>
            <button className="btn" onClick={() => navigate('/profile')} style={profileButtonStyle}><img src={ProfileButton}/></button>
            <div style={containerStyle}>
                {!startClicked ? (
                    <div className="start-button" onClick={startGame}>
                        <span className="tooltip" style={{fontFamily: 'SellYourSoul'}}>Good Luck!</span>
                        <span><img src={StartButton}/></span>
                    </div>
                ) : !isCreatingGame ? (
                    <AnimatePresence>
                        <motion.button
                            className="btn btn-primary"
                            onClick={startCreatingGame}
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
                            className="btn btn-primary"
                            onClick={() => navigate('/game')}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            Test Game
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
                ) : (
                    <AnimatePresence>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={cardStyle}
                        >
                            <form onSubmit={createGame}>
                                <input className="input-field" type="text" placeholder="Rival Username" style={inputStyle} required />
                                {/* <input className="input-field" type="text" placeholder="Game Code" style={inputStyle} required /> */}
                                <div style={buttonContainerStyle}>
                                    <button type="submit" className="btn btn-primary" onClick={Game} style={smallerButtonStyle}>Create</button>
                                    <button type="button" className="btn btn-secondary" onClick={cancelCreatingGame} style={smallerButtonStyle}>Cancel</button>
                                </div>
                            </form>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};

export default HomePage;
