import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import mainImage from './test.png';
import character1 from '../images/Aldric.png';
import character2 from '../images/Calypso.png';
import character3 from '../images/Celeste.png';
import cardImage1 from '../images/Elara.png';
import cardImage2 from '../images/Elysia.png';
import cardImage3 from '../images/ArachnocrabTreeshell.png';
import './css/App.css'; // Importing fonts
import HomeButton from '../images/HomeButton.png';
import ArrowLeft from '../images/ArrowLeft.png';
import ArrowRight from '../images/ArrowRight.png';
import ChangeButton from '../images/ChangeButton.png';

const ProfilePage = () => {
  const navigate = useNavigate();

  const characters = [character1, character2, character3];

  const stats = { gamesWon: 10, gamesLost: 5, gamesTied: 2 };
  const cards = [cardImage1, cardImage2, cardImage3];

  // State for currently shown card
  const [currentCard, setCurrentCard] = useState(0);
  const [currentCharacter, setCurrentCharacter] = useState(characters[0]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [changeMode, setChangeMode] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const storedCharacter = localStorage.getItem('selectedCharacter');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken.username);
    }
    if (storedCharacter) {
      setCurrentCharacter(storedCharacter);
      setSelectedCharacter(storedCharacter);
    }
  }, []);

  const nextCharacter = () => {
    const currentIndex = characters.indexOf(selectedCharacter);
    const nextIndex =
      currentIndex >= characters.length - 1 ? 0 : currentIndex + 1;
    setSelectedCharacter(characters[nextIndex]);
  };

  const prevCharacter = () => {
    const currentIndex = characters.indexOf(selectedCharacter);
    const prevIndex =
      currentIndex <= 0 ? characters.length - 1 : currentIndex - 1;
    setSelectedCharacter(characters[prevIndex]);
  };

  const confirmCharacter = () => {
    localStorage.setItem('selectedCharacter', selectedCharacter);
    setCurrentCharacter(selectedCharacter);
    setChangeMode(false);
  };

  const cancelChange = () => {
    setChangeMode(false);
    localStorage.removeItem('selectedCharacter');
  };

  const beginChange = () => {
    setSelectedCharacter(currentCharacter);
    setChangeMode(true);
  };

  const nextCard = () => {
    setCurrentCard((currentCard + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((currentCard - 1 + cards.length) % cards.length);
  };

  const pageVariants = {
    initial: {
      x: '100%',
      opacity: 0,
    },
    animate: {
      x: '0%',
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const style = {
    backgroundImage: `url(${mainImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '20px',
    position: 'relative',
    color: 'white',
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
    color: 'white',
  };

  const homeButtonStyle = {
    position: 'absolute',
    top: '100px',
    left: '50%',
    transform: 'translate(-50%)',
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
      <h1 style={titleStyle}>Profile Page</h1>
      <button
        className="btn"
        style={homeButtonStyle}
        onClick={() => navigate('/home')}
      >
        <img src = {HomeButton} alt='homebutton' />
      </button>

      <Card
        style={{
          minWidth: '300px',
          minHeight: '400px',
          position: 'relative',
          marginTop: '7em',
          marginLeft: '6em',
          padding: '20px',
          backgroundColor: 'transparent',
          border: 'none'
        }}
      >
        {changeMode ? (
          <>
            <div
              style={{
                position: 'absolute',
                left: '-6em',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'transparent',
                border: 'none'
              }}
            >
              <Button
                variant="primary"
                className="character-button"
                onClick={prevCharacter}
              >
                Previous
              </Button>
            </div>
            <div
              style={{
                position: 'absolute',
                right: '-4.2em',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <Button
                variant="primary"
                className="character-button"
                onClick={nextCharacter}
              >
                Next
              </Button>
            </div>
          </>
        ) : null}
        <Card.Img
          variant="top"
          src={changeMode ? selectedCharacter : currentCharacter}
          alt="Current Character"
          className="character-image"
        />
        <Card.Text
          style={{
            textAlign: 'center',
            marginTop: '10px',
            color: 'white',
            fontFamily: 'SellYourSoul',
            fontSize: '20px',
            height: 'auto'
          }}
        >
          Username: {username}
        </Card.Text>
        {changeMode ? (
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <Button
              variant="success"
              className="character-button"
              onClick={confirmCharacter}
            >
              ✔
            </Button>
            <Button
              variant="danger"
              className="character-button"
              onClick={cancelChange}
            >
              ✖
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="change-button"
            style={{ marginTop: '10px', backgroundColor: 'transparent', border: 'none' }}
            onClick={beginChange}
          >
            <img src={ChangeButton} alt='changebutton' />
          </Button>
        )}
      </Card>

      <Container>
        <Row>
          <Col>
            <h2 style={{ fontFamily: 'SellYourSoul' }}>Stats</h2>
            <p style={{ fontFamily: 'SellYourSoul' }}>
              Games won: {stats.gamesWon}
            </p>
            <p style={{ fontFamily: 'SellYourSoul' }}>
              Games lost: {stats.gamesLost}
            </p>
            <p style={{ fontFamily: 'SellYourSoul' }}>
              Games tied: {stats.gamesTied}
            </p>
          </Col>

          <Col>
            <h2 style={{ fontFamily: 'SellYourSoul' }}>My Cards</h2>
            <Button onClick={prevCard} style={{backgroundColor: 'transparent', border: 'none'}}><img src={ArrowLeft}/></Button>
            <Card.Img
              variant="top"
              src={cards[currentCard]}
              alt="Card Image"
              className="card-image"
              style={{
                width: 'auto',
                height: '300px',
                objectFit: 'cover',
                marginTop: '-20px',
              }}
            />

            <Button onClick={nextCard} style={{backgroundColor: 'transparent', border: 'none'}}><img src={ArrowRight}/></Button>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default ProfilePage;
