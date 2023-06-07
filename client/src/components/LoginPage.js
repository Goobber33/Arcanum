import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './css/AuthPage.css';
import bgVideo from './background.mp4';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import titleScreen from '../images/TitleScreen.png';
import beginButton from '../images/Button-Begin.png';
import loginForm from '../images/LoginForm.png';

const styles = {
  buttonStyle: {
    position: 'relative',
    zIndex: '9999',
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    color: 'inherit',
    outline: 'none'
  },

  formStyle: {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    height: '50%',
    width: '50%',
  },

  formboxStyle: {
    backgroundImage: `url(${loginForm})`,
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    height: '600px',
    width: '600px',
  },

  inputStyle: {
    backgroundColor: 'gray',
    border: 'none',
    color: 'white',
  },

  labelStyle: {
    color: 'white',
  },
};

function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const endpoint = isLogin ? '/login' : '/signup';
    try {
      const { data } = await axios.post(`http://localhost:4000/auth${endpoint}`, { username, password });
      if (isLogin) {
        localStorage.setItem('jwt', data.token);
        onLogin();
        navigate('/character-selection', { state: { username } });
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="page container d-flex justify-content-center align-items-center full-height">
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <img src={titleScreen} alt="Title Screen" className="bg-image" />
      <Button onClick={() => setShowModal(true)} className="begin-button" style={styles.buttonStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={beginButton} alt="begin" style={{ width: '300px', height: '400px' }} />
        </div>
      </Button>


      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="custom-modal-dialog"
        contentClassName="custom-modal-content"
      >
        <Modal.Body style={styles.formboxStyle}>
          <form className="auth-form" onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}>

            <div className="login-container" style={styles.formContainer} dialogClassName="custom-modal">
              <div className="image-container">
                <div className="mb-3" style={{ position: 'relative', backgroundColor: 'transparent !important', border: 'none' }}>
                  <label className="form-label" style={styles.labelStyle}>
                    Username:
                    <input
                      type="text"
                      className="form-control"
                      style={styles.inputStyle}
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mb-3 password-wrapper">
                  <label className="form-label" style={styles.labelStyle}>
                    Password:
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control password-input"
                    style={styles.inputStyle}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'transparent', border: 'none' }}>
                    {isLogin ? 'Login' : 'Signup'}
                  </button>
                  <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Switch to Signup' : 'Switch to Login'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LoginPage;