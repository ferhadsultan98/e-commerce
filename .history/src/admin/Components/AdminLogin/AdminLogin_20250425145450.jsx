import React, { useState } from "react";
import "./AdminLogin.scss";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (replace with actual authentication logic)
    if (email && password) {
      // Simulate admin authentication (replace with API call)
      if (email === "sultanoworks@gmail.com" && password === "admin123") {
        onLogin(true); // Call onLogin with admin=true
        setError("");
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