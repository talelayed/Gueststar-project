import React, { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", userData);
    // Envoie à ton backend ici
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google user:", decoded);
    // Tu peux ensuite envoyer les données décodées à ton backend pour traitement
  };

  const handleGoogleError = () => {
    console.log("Login Failed");
  };

  return (
    <div>
    <h1 className="login-title">Connexion</h1>
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">S'inscrire</button>
        <p>Voulez-vous s'inscrire? <Link to="/register">Créer un compte</Link></p>
      </form>

      <div className="divider">ou</div>

      <div className="google-signin">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
    </div>
  );
};
