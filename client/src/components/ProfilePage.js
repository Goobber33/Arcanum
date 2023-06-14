import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import mainImage from './test.png';
import character1 from '../images/Characters/Aldric.png';
import character2 from '../images/Characters/Calypso.png';
import character3 from '../images/Characters/Celeste.png';
import character4 from '../images/Characters/Elara.png';
import character5 from '../images/Characters/Elysia.png';
import character6 from '../images/Characters/Finnian.png';
import character7 from '../images/Characters/Griffin.png';
import character8 from '../images/Characters/Tarik.png';
import character9 from '../images/Characters/Torvald.png';
import character10 from '../images/Characters/Zara.png';
import cardImage1 from '../images/Creatures/AbyssalSpellweaver.png';
import cardImage2 from '../images/Creatures/AmethystBlazebug.png';
import cardImage3 from '../images/Creatures/ArachnocrabTreeshell.png';
import cardImage4 from '../images/Creatures/BjornTheAxeFury.png';
import cardImage5 from '../images/Creatures/CelestialScalebearer.png';
import cardImage6 from '../images/Creatures/ColossalVoidgaze.png';
import cardImage7 from '../images/Creatures/DreadmawRavager.png';
import cardImage8 from '../images/Creatures/EmberguardSentinel.png';
import cardImage9 from '../images/Creatures/ForestbaneBerserker.png';
import cardImage10 from '../images/Creatures/FungalAxemaster.png';
import cardImage11 from '../images/Creatures/GrimbeakCrownbearer.png';
import cardImage12 from '../images/Creatures/Mountainstride.png';
import cardImage13 from '../images/Creatures/OcculoidTentaculus.png';
import cardImage14 from '../images/Creatures/ScaleslashSerpentkin.png';
import cardImage15 from '../images/Creatures/Scorchfang.png';
import cardImage16 from "../images/Creatures/SpectralTidewarden.png";
import cardImage17 from '../images/Creatures/TalonshotArcher.png';
import cardImage18 from '../images/Creatures/VenomcoilMawripper.png';
import cardImage19 from '../images/Creatures/ViperthornAzurefang.png';
import cardImage20 from '../images/Creatures/WarbrandColossus.png';
import cardImage21 from '../images/Creatures/WastelandDevourer.png';
import './css/App.css'; // Importing fonts
import HomeButton from '../images/page elements/HomeButton.png';
import ArrowLeft from '../images/page elements/ArrowLeft.png';
import ArrowRight from '../images/page elements/ArrowRight.png';
import ChangeButton from '../images/page elements/ChangeButton.png';
import ConfirmButton from '../images/page elements/ConfirmButton.png';
import NoButton from '../images/page elements/NoButton.png';

const ProfilePage = () => {
  const navigate = useNavigate();

  const characters = [character1, character2, character3, character4, character5, character6, character7, character8, character9, character10];

  const stats = { gamesWon: 10, gamesLost: 5, gamesTied: 2 };
  const cards = [cardImage1, cardImage2, cardImage3, cardImage4, cardImage5, cardImage6, cardImage7, cardImage8, cardImage9, cardImage10, cardImage11, cardImage12, 
                 cardImage13, cardImage14, cardImage15, cardImage16, cardImage17, cardImage18, cardImage19, cardImage20, cardImage21];

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
    border: 'none'
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
      <Container>
      <motion.div whileTap={{scale: '0.8'}}>
      <button
        className="btn"
        style={homeButtonStyle}
        onClick={() => navigate('/home')}
      >
        <img src = {HomeButton} alt='homebutton' />
      </button>
      </motion.div>
      </Container>
    <Container>
       <Row>
        <Col md={6}>
      <Card
        style={{
          minWidth: '300px',
          minHeight: '400px',
          position: 'relative',
          marginTop: '22em',
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
                left: '-5em',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'transparent',
                border: 'none'
              }}
            >
            <motion.div whileTap={{scale: 0.8}}>
              <Button
                variant="primary"
                className="character-button"
                onClick={prevCharacter}
                style={{backgroundColor: 'transparent', border: 'none', marginLeft: '10px', marginTop: '-400px', padding: '0px'}}
              >
                <img src={ArrowLeft} alt='arrow-left'/>
              </Button>
            </motion.div>
            </div>
            <div
              style={{
                position: 'absolute',
                right: '-4.2em',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
            <motion.div whileTap={{scale: 0.8}}>
              <Button
                variant="primary"
                className="character-button"
                onClick={nextCharacter}
                style={{backgroundColor: 'transparent', border: 'none', marginTop: '-400px', padding: '0px'}}
              >
               <img src={ArrowRight} alt='arrow-right'/>
              </Button>
              </motion.div>
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
            height: 'auto',
          }}
        >
        
          <h1>Username: {username}</h1>
          <div className='row'> 
          <div className='col md-6' style={{alignItems: 'center', display: 'flex', flexDirection:'column'}}>
          <h2 style={{ fontFamily: 'SellYourSoul', fontSize: '2em', marginRight: '25px' }}>Stats</h2>
            <p style={{ fontFamily: 'SupernaturalKnight', fontSize: '1.5em', marginLeft: '15px' }}>
            Games won: {stats.gamesWon}
            </p>
            <p style={{ fontFamily: 'SupernaturalKnight', fontSize: '1.5em' }}>
            Games lost: {stats.gamesLost}
            </p>
            <p style={{ fontFamily: 'SupernaturalKnight', fontSize: '1.5em' }}>
            Games tied: {stats.gamesTied}
            </p>
            </div>
            </div>
        </Card.Text>
        {changeMode ? (
    
        
          <div style={{ display: 'flex', marginTop: '10px', marginLeft: '-25px' }}>
          <motion.div whileTap={{scale: 0.8}}>
            <Button
              variant="success"
              className="character-button"
              onClick={confirmCharacter}
              style={{backgroundColor: 'transparent', border: 'none'}}
            >
              <img src={ConfirmButton} alt  ='confirm-button' />
            </Button>
            </motion.div>
            <motion.div whileTap={{scale: 0.8}}>
            <Button
              variant="danger"
              className="character-button"
              onClick={cancelChange}
              style={{backgroundColor: 'transparent', border: 'none'}}
            >
              <img src={NoButton} alt='no-button' />
            </Button>
            </motion.div>
          </div>
          
        ) : (
        <motion.div whileTap={{scale: '0.8'}}>
          <Button
            variant="primary"
            className="change-button"
            style={{marginTop:'-20px', backgroundColor: 'transparent', border: 'none', marginRight: '25px' }}
            onClick={beginChange}
          >
            <img src={ChangeButton} alt='changebutton' />
          </Button>
        </motion.div>
        )}
      </Card>
        </Col>
          <Col md={6} style={{marginTop: '80px'}}>
            <h2 style={{ fontFamily: 'SellYourSoul', margin: '20px' }}>My Cards</h2>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '70px'}}>
            <motion.div whileTap={{scale: 0.8}}>
            <Button onClick={prevCard} style={{backgroundColor: 'transparent', border: 'none',}}><img src={ArrowLeft}/></Button>
            </motion.div>
            <Card.Img
              variant="top"
              src={cards[currentCard]}
              alt="Card Image"
              className="card-image"
              style={{
                width: 'auto',
                height: '375px',
                objectFit: 'cover',
                marginTop: '-20px',
              }}
            />
            <motion.div whileTap={{scale: 0.8}}>
            <Button onClick={nextCard} style={{backgroundColor: 'transparent', border: 'none'}}><img src={ArrowRight}/></Button>
            </motion.div>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default ProfilePage;