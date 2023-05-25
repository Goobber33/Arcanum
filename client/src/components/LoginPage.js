import React, { useState } from 'react';
import './css/AuthPage.css';
import bgVideo from './background.mp4'; // Import the background video file

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can distinguish between login and signup requests based on the isLogin state
    // Then perform the appropriate request
  };

  return (
    <div className="container d-flex justify-content-center align-items-center full-height">
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="auth-container p-5">
        <button className="btn btn-primary mb-4" onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
        <h2 className="mb-4">{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-3">
            <label className="form-label">
              Password:
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
