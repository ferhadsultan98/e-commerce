import React, { useState } from "react";
import "../../Styles/Login.scss";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      if (email === "admin@admin.com" && password === "admin") {
        onLogin(false);
        setError("");
      } else {
        setError("Invalid credentials");
      }
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h2>Kullanıcı Giriş</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="loginButton">
            Giriş Yap
          </button>
        </form>
        <p className="signupLink">
          Hesabınız yok mu? <a href="#">Kayıt olun</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
