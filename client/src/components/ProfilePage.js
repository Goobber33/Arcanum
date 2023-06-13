import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import mainImage from './test.png';
import character1 from '../images/Characters/Aldric.png';
import character2 from '../images/Characters/Calypso.png';
import character3 from '../images/Characters/Celeste.png';
import cardImage1 from '../images/Characters/Elara.png';
import cardImage2 from '../images/Characters/Elysia.png';
import cardImage3 from '../images/Creatures/ArachnocrabTreeshell.png';
import './css/App.css'; // Importing fonts
import HomeButton from '../images/page elements/HomeButton.png';
import ArrowLeft from '../images/page elements/ArrowLeft.png';
import ArrowRight from '../images/page elements/ArrowRight.png';
import ChangeButton from '../images/page elements/ChangeButton.png';
import ConfirmButton from '../images/page elements/ConfirmButton.png';
import NoButton from '../images/page elements/NoButton.png';

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

      {/* <Card
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
                style={{backgroundColor: 'transparent', border: 'none', marginLeft: '25px'}}
              >
                <img src={ArrowLeft} alt='arrow-left'/>
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
                style={{backgroundColor: 'transparent', border: 'none',}}
              >
               <img src={ArrowRight} alt='arrow-right'/>
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
              style={{backgroundColor: 'transparent', border: 'none'}}
            >
              <img src={ConfirmButton} alt  ='confirm-button' />
            </Button>
            <Button
              variant="danger"
              className="character-button"
              onClick={cancelChange}
              style={{backgroundColor: 'transparent', border: 'none'}}
            >
              <img src={NoButton} alt='no-button' />
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
      </Card> */}

      <Container>
       <Row>
        <Col md={6}>
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
                left: '-5em',
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
                style={{backgroundColor: 'transparent', border: 'none', marginLeft: '10px', marginTop: '-400px'}}
              >
                <img src={ArrowLeft} alt='arrow-left'/>
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
                style={{backgroundColor: 'transparent', border: 'none', marginTop: '-400px', marginLeft: '20px'}}
              >
               <img src={ArrowRight} alt='arrow-right'/>
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
            height: 'auto',
          }}
        >
        
          <h1>Username: {username}</h1>
          <div className='row'> 
          <div className='col md-6' style={{alignItems: 'center', display: 'flex', flexDirection:'column'}}>
          <h2 style={{ fontFamily: 'SellYourSoul', fontSize: '2em', marginRight: '25px' }}>Stats</h2>
            <p style={{ fontFamily: 'SellYourSoul', fontSize: '1.5em', marginLeft: '15px' }}>
            Games won: {stats.gamesWon}
            </p>
            <p style={{ fontFamily: 'SellYourSoul', fontSize: '1.5em' }}>
            Games lost: {stats.gamesLost}
            </p>
            <p style={{ fontFamily: 'SellYourSoul', fontSize: '1.5em' }}>
            Games tied: {stats.gamesTied}
            </p>
            </div>
            </div>
        </Card.Text>
        {changeMode ? (
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <Button
              variant="success"
              className="character-button"
              onClick={confirmCharacter}
              style={{backgroundColor: 'transparent', border: 'none'}}
            >
              <img src={ConfirmButton} alt  ='confirm-button' />
            </Button>
            <Button
              variant="danger"
              className="character-button"
              onClick={cancelChange}
              style={{backgroundColor: 'transparent', border: 'none'}}
            >
              <img src={NoButton} alt='no-button' />
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="change-button"
            style={{marginTop:'-20px', backgroundColor: 'transparent', border: 'none', marginRight: '25px' }}
            onClick={beginChange}
          >
            <img src={ChangeButton} alt='changebutton' />
          </Button>
        )}
      </Card>
        </Col>
          <Col md={6} style={{marginTop: '80px'}}>
            <h2 style={{ fontFamily: 'SellYourSoul', margin: '20px' }}>My Cards</h2>
            <Button onClick={prevCard} style={{backgroundColor: 'transparent', border: 'none'}}><img src={ArrowLeft}/></Button>
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

            <Button onClick={nextCard} style={{backgroundColor: 'transparent', border: 'none'}}><img src={ArrowRight}/></Button>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default ProfilePage;