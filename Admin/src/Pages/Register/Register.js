import React, { useState } from "react";
import "./SignUp.css";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export const Register = () => {
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
    const decoded = jwt_decode(credentialResponse.credential);
    console.log("Google user:", decoded);
    // Tu peux ensuite envoyer les données décodées à ton backend pour traitement
  };

  const handleGoogleError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="signup-container">
      <h2>Créer un compte</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={userData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
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
      </form>

      <div className="divider">ou</div>

      <div className="google-signin">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
};
