import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AdminLogin.scss";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      if (email === "admin@admin.com" && password === "admin") {
        onLogin(true); 
        setError("");
        navigate("/admin/products"); 
      } else {
        setError("Invalid admin credentials");
      }
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="adminLoginContainer">
      <div className="adminLoginBox">
        <h2>Admin Giriş</h2>
        <form onSubmit={handleSubmit}>
          <div className="adminInputGroup">
            <label htmlFor="adminEmail">E-posta</label>
            <input
              type="email"
              id="adminEmail"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="adminInputGroup">
            <label htmlFor="adminPassword">Şifre</label>
            <input
              type="password"
              id="adminPassword"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="adminLoginButton">
            Giriş Yap
          </button>
        </form>
        <p className="adminSignupLink">
          Hesabınız yok mu? <a href="#">Kayıt olun</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;