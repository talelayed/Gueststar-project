import { useEffect, useState } from "react";
import "./AddTheme.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";

export const AddTheme = () => {

    const [theme, setTheme] = useState("")
    const handleAddTheme = (e) => {
        setTheme(e.target.value)
    }

    const {currentUser} = useSelector((state) => state.auth);

const addThemeFunction = async (title) => {    

//   const token = localStorage.getItem("token"); // Récupérer le token JWT
const token = currentUser.token

  try {
    const response = await axios.post(
      "http://localhost:4000/api/themes/",
      { title },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        // withCredentials: true, // Si ton backend gère les sessions/cookies
      }
    );

    console.log("Thème ajoutée :", response.data);
    alert(`Thème ${title} ajoutée avec succès !`);
      await toast('Modèle ajouté avec succées!',{
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

  } catch (error) {
    console.error("Erreur lors de l'ajout de la thème :", error);
  }
};

const [themes, setThemes] = useState([])

useEffect(() => {
  const fetchThemes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/themes");
      setThemes(res.data.themes)
      
    } catch (err) {
      console.error("Erreur lors du chargement des themes :", err);
    }
  }
  fetchThemes()
}, [])

  return (
    <div className="add-category-container">
      <div className="add-category-grid">
        <div>
        <div className="add-category-grid-item">
            <h1>Ajouter thème</h1>
            <h4>Nom du thème</h4>
            <div className="add-category-input">
              <input
              value={theme}
               onChange={handleAddTheme}
               className="add-category-input-text" placeholder="Nom du thème"/>
            </div>
        </div>
          <div className="category-publish-buttons">
            <button onClick={()=>{addThemeFunction(theme)}}>Publier !</button>
          </div>
      <div className="theme-list">
        <h2>Thèmes existants :</h2>
        <ul>
          {themes.length === 0 ? (
            <p>Aucun thème pour le moment.</p>
          ) : (
            themes.map((themeItem, index) => (
              <li key={index}>{themeItem.title}</li>
            ))
          )}
        </ul>
      </div>
      </div>
    </div>
      <ToastContainer position="top-right"/>
    </div>
  )
}