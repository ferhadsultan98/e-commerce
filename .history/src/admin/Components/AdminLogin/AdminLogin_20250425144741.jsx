import React from 'react';
import './AdminLogin.scss';

const AdminLogin = () => {
  return (
    <div className="adminLoginContainer">
      <div className="adminLoginBox">
        <h2>Admin Giriş</h2>
        <form>
          <div className="adminInputGroup">
            <label htmlFor="adminEmail">E-posta</label>
            <input
              type="email"
              id="adminEmail"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="adminInputGroup">
            <label htmlFor="adminPassword">Şifre</label>
            <input
              type="password"
              id="adminPassword"
              placeholder="••••••••"
              required
            />
          </div>
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
