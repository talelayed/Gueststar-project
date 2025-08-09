import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/apiCalls/apiCalls";
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {

  const loginState = useSelector((state) => state.auth);

  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


    const handleLogin = async(e) => {
      e.preventDefault();
    try {
      await login(dispatch, userData);
      if(loginState.error) toast.error("Wrong credentials!",{
      style: { marginTop: '70px', height: '70px' },
      theme: "light",
      autoClose: 2000, // Close after 2 seconds
      hideProgressBar: false, // Show the progress bar
      closeOnClick: true, // Close the toast on click
      pauseOnHover: true, // Pause the countdown on hover
      draggable: true, // Allow dragging to dismiss
      progress: undefined, // Use the default progress bar
      })
      else{
      await toast('Connecté avec succés!',{
      style: { marginTop: '70px', height: '70px' },
      theme: "light",
      autoClose: 2000, // Close after 2 seconds
      hideProgressBar: false, // Show the progress bar
      closeOnClick: true, // Close the toast on click
      pauseOnHover: true, // Pause the countdown on hover
      draggable: true, // Allow dragging to dismiss
      progress: undefined, // Use the default progress bar
      // Add other customization options as needed
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
    }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="login-title">Connexion</h1>
      <div className="signup-container">
        <form className="signup-form" onSubmit={(e) => handleLogin(e)}>
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
          <button type="submit">Se connecter</button>
          <p>Ajouter un utilisateur ? <Link to="/add-user">Créer un compte</Link></p>
        </form>
      </div>
      <ToastContainer position="top-right"/>
    </div>
  );
};
