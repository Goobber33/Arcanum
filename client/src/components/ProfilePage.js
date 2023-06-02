import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import mainImage from './test.png'

const ProfilePage = () => {
    const navigate = useNavigate();

    const pageVariants = {
        initial: {
            x: "100%",
            opacity: 0
        },
        animate: {
            x: "0%",
            opacity: 1
        },
        exit: {
            x: "-100%",
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
        position: 'relative',
        color:'white'
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

    const homeButtonStyle = {
        position: 'absolute',
        top: '100px',
        left: '50%',
        transform: 'translate(-50%)'
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
            <button className="btn btn-primary" style={homeButtonStyle} onClick={() => navigate('/home')}>Home</button>
            {/* Your Profile Page contents go here */}
        </motion.div>
    );
};

export default ProfilePage;