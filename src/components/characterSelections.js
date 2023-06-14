import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import bgVideo from './background.mp4';
import character1 from '../images/Characters/Aldric.png';
import character2 from '../images/Characters/Calypso.png';
import character3 from '../images/Characters/Celeste.png';
import character4 from '../images/Characters/Elysia.png';
import character5 from '../images/Characters/Elara.png';
import character6 from '../images/Characters/Finnian.png';
import character7 from '../images/Characters/Griffin.png';
import character8 from '../images/Characters/Tarik.png';
import character9 from '../images/Characters/Torvald.png';
import character10 from '../images/Characters/Zara.png';
import swordImage from '../images/sword.png';
import './css/App.css';
import arrowLeft from '../images/page elements/ArrowLeft.png';
import arrowRight from '../images/page elements/ArrowRight.png';

const CharacterSelectionPage = () => {
  const navigate = useNavigate();

  const characters = [
    character1,
    character2,
    character3,
    character4,
    character5,
    character6,
    character7,
    character8,
    character9,
    character10,
  ];
  const charactersPerPage = 5;
  const totalPages = Math.ceil(characters.length / charactersPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [showSwordIndex, setShowSwordIndex] = useState(null);
  const [swordPosition, setSwordPosition] = useState({ x: 0, y: 0 });
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 2 + totalPages) % totalPages + 1);
  };

  const handleCharacterSelect = (index) => {
    const character = characters[index];
    setSelectedCharacter(character);
  };

  useEffect(() => {
    if (selectedCharacter) {
      const index = characters.indexOf(selectedCharacter);
      localStorage.setItem('selectedCharacter', selectedCharacter);
      localStorage.setItem('selectedCharacterIndex', index);
      console.log('Selected character:', selectedCharacter);
      console.log('About to navigate to /home');
      navigate('/home');
      // This user has chosen a character before
      localStorage.setItem('hasChosenCharacterBefore', 'true');
    }
  }, [selectedCharacter, navigate]);

  const handleMouseEnter = (index, event) => {
    setShowSwordIndex(index);
    const rect = event.target.getBoundingClientRect();
    const offset = 50;
    setSwordPosition({ x: rect.x + rect.width / 2, y: rect.y - offset });
  };

  const handleMouseLeave = () => {
    setShowSwordIndex(null);
  };

  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;

  const pageVariants = {
    initial: {
      y: '100%',
      opacity: 0,
    },
    animate: {
      y: '0%',
      opacity: 1,
    },
    exit: {
      y: '-100%',
      opacity: 0,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const cardStyle = {
    position: 'relative',
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    position: 'relative',
    backgroundColor: '#333',
    color: 'white',
  };

  const charactersContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '11rem',
    position: 'relative',
  };

  const arrowButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '2rem',
  };

  const prevArrowStyle = {
    ...arrowButtonStyle,
    left: '5rem',
  };

  const nextArrowStyle = {
    ...arrowButtonStyle,
    right: '5rem',
  };

  const swordContainerStyle = {
    position: 'absolute',
    top: `${swordPosition.y}px`,
    left: `${swordPosition.x}px`,
    transform: 'translate(-50%, -100%)',
    zIndex: 1,
    display: showSwordIndex !== null ? 'block' : 'none',
  };

  const swordImageStyle = {
    width: '100px',
    height: '100px',
    animation: 'arrow-bounce 1.2s infinite',
  };

  const headingStyle = {
    marginBottom: '50px',
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={containerStyle}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          left: '50%',
          top: '50%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: '-1',
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <h1 style={headingStyle}>Character Selection</h1>
    <motion.div whileTap={{scale: 0.8}}>
      <button
        className="text-white mb-3"
        type="button"
        style={nextArrowStyle}
        onClick={handleNextPage}
      >
        <img src ={arrowRight} />
      </button>
      </motion.div>
      <motion.div whileTap={{scale: 0.8}}>
      <button type="button" style={prevArrowStyle} onClick={handlePrevPage}>
      <img src ={arrowLeft} />
      </button>
      </motion.div>
      <Container>
        <Row>
          <Col>
            <div style={charactersContainerStyle}>
              {characters
                .slice(startIndex, endIndex)
                .map((character, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={(event) =>
                      handleMouseEnter(startIndex + index, event)
                    }
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      console.log('Card clicked');
                      handleCharacterSelect(startIndex + index);
                    }}
                    style={
                      showSwordIndex === startIndex + index
                        ? { ...cardStyle, zIndex: 2 }
                        : cardStyle
                    }
                  >
                    <img
                      src={character}
                      alt={`Character ${index + 1}`}
                      style={{ width: '100%', cursor: 'pointer' }}
                    />
                  </motion.div>
                ))}
            </div>
          </Col>
        </Row>
      </Container>

      <div style={swordContainerStyle}>
        <img
          src={swordImage}
          alt="Sword"
          style={swordImageStyle}
          className="arrow-down-one"
        />
      </div>
    </motion.div>
  );
};

export default CharacterSelectionPage;