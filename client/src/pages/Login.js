import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    const data = { username: username, password: password };
    axios.post("http://localhost:3001/users/login", data)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        setError("Login failed. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue sharing your Nordic adventures and connect with fellow travelers</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              onKeyPress={handleKeyPress}
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={handleKeyPress}
              className="auth-input"
            />
          </div>

          <button 
            onClick={login} 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/registration" className="auth-link">
              Join our community
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
