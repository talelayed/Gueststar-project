import React, { useState } from "react";
import "./Register.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

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

  return (
    <div>
    <h1 className="register-title">Créer un compte</h1>
    <div className="signup-container">
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
        <p>Avez-vous déjà un compte? <Link to="/login">Se connecter</Link></p>
      </form>

      <div className="divider">ou</div>
    </div>
    </div>
  );
};
