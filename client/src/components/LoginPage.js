import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './css/AuthPage.css';
import bgVideo from './background.mp4';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
                navigate('/home');
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
            <div className="auth-container p-5">
                <button className="btn btn-primary mb-4" onClick={() => setIsLogin(!isLogin)}>
                    Switch to {isLogin ? "Signup" : "Login"}
                </button>
                <h2 className="mb-4">{isLogin ? "Login" : "Signup"}</h2>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    handleLogin();
                }}>
                    <div className="mb-3">
                        <label className="form-label">
                            Username:
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="mb-3 password-wrapper">
                        <label className="form-label">
                            Password:
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control password-input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary password-toggle-button border-0"
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onMouseLeave={() => setShowPassword(false)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {isLogin ? "Login" : "Signup"}
                    </button>
                </form>
            </div>

            {/* Success Modal */}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your account was successfully created!</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleCloseModal}>
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LoginPage;
