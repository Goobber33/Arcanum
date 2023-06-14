import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import mainImage from './test.png';
import './css/App.css';
import ProfileButton from '../images/page elements/Profile.png';
import LogoutButton from '../images/page elements/Logout.png';
import StartButton from '../images/page elements/StartButton.png';
import CreateGame from '../images/page elements/CreateGame.png';
import JoinGame from '../images/page elements/JoinGame.png';
import TestGame from '../images/page elements/TestGame.png';
import CancelButton from '../images/page elements/Cancel.png';
import axios from 'axios';

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
        top: '20px',
        left: 'calc(50% - 60px)',
        transform: 'translateX(-50%)'
    };

    const profileButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: 'calc(50% + 60px)',
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

    const createGame = (event) => {
        event.preventDefault();
        const rivalUsername = event.target.elements.rivalUsername.value;
        
        // Call backend endpoint to create game
        axios.post('https://arcanum.herokuapp.com/game/create', {
          player2: rivalUsername
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            console.log(response.data);
            // you can navigate to the game page here or show some message
          })
          .catch(error => {
            console.error(error);
          });
      }
         

    const cancelCreatingGame = () => {
        setIsCreatingGame(false);
    }

    const joinExistingGame = () => {
        setIsCreatingGame(true);
    }

    const buttonVariants = {
        hidden: { opacity: 0, y: "-100%" },
        visible: { opacity: 1, y: 0 },
    };

    const gameButtonStyle = {
        width: '150px',
        marginBottom: '20px',
        backgroundColor: 'transparent',
        border: 'none',
        marginRight: '100px'
        
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
            
                
            <div style={containerStyle}>
                {!startClicked ? (
                    <motion.div  whileTap={{scale: '0.8'}} >
                    <div className="start-button" onClick={startGame}>
                        <span className="tooltip" style={{fontFamily: 'SellYourSoul'}}>Good Luck!</span>
                        <span><img src={StartButton}/></span>
                    </div>
                   </motion.div>
                 
                ) : !isCreatingGame ? (
                    <AnimatePresence>
                        <motion.button
                            whileTap={{scale: '0.8'}}
                            className="btn btn-primary"
                            onClick={() => navigate('/game')}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            <img src={CreateGame} alt ='create-game-button' />
                        </motion.button>
                        <motion.button
                            whileTap={{scale: '0.8'}}
                            className="btn btn-primary"
                            onClick={(joinExistingGame)}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            <img src={JoinGame} alt='join-game-button' />
                        </motion.button>
                        <motion.button
                            whileTap={{scale: '0.8'}}
                            className="btn btn-primary"
                            onClick={() => navigate('/game')}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            <img src={TestGame} alt='test-game-button' />
                        </motion.button>
                        <motion.button
                            whileTap={{scale: '0.8'}}
                            className="btn btn-primary"
                            onClick={() => navigate('/profile')}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            <img src={ProfileButton}/>
                        </motion.button>
                        <motion.button
                            whileTap={{scale: '0.8'}}
                            className="btn btn-primary"
                            onClick={onLogout}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            <img src={LogoutButton}/>
                        </motion.button>
                        <motion.button
                            whileTap={{scale: '0.8'}}
                            className="btn btn-secondary"
                            onClick={cancelGame}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={buttonVariants}
                            style={gameButtonStyle}
                        >
                            <img src={CancelButton} alt='cancel-button' />
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
                            <input className="input-field" name="rivalUsername" type="text" placeholder="Rival Username" style={inputStyle} required />
                                {/* <input className="input-field" type="text" placeholder="Game Code" style={inputStyle} required /> */}
                                <div style={buttonContainerStyle}>
                                    <button type="submit" className="btn btn-primary" onClick={() => navigate('/game')} style={smallerButtonStyle}>Join</button>
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