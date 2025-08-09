import { useEffect, useState } from "react";
import "./AddWorker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import ProfileImageUploader from "../../Components/ProfileImageUploader/ProfileImageUploader";

export const AddWorker = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    img: null,
    name: "",
    surname: "",
    email: "",
    password: "",
    number: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    instagram: "",
    tiktok: "",
    isAdmin: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Créer un FormData pour envoyer les données avec le fichier
      const formData = new FormData();
      
      // Ajouter tous les champs au FormData
      Object.keys(userData).forEach(key => {
        if (key === 'img' && userData[key]) {
          // Ajouter le fichier image
          formData.append('img', userData[key]);
        } else if (key !== 'img') {
          // Ajouter les autres champs
          formData.append(key, userData[key]);
        }
      });

      // Envoyer avec les bons headers pour multipart/form-data
      await axios.post("http://localhost:4000/api/workers/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success("Utilisateur ajouté avec succès !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      toast.error("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  const handleImageSelect = (file) => {
    console.log("file", file);
    setUserData((prev) => ({
      ...prev,
      img: file,
    }));
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div>
      <h1 className="add-worker-title">Créer un utilisateur</h1>
      <div className="add-worker-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="profile-image-container">
            <ProfileImageUploader onImageSelect={handleImageSelect}/>
          </div>
          <input name="name" placeholder="Nom" value={userData.name} onChange={handleChange} required />
          <input name="surname" placeholder="Prénom" value={userData.surname} onChange={handleChange} required />
          <input type="email" name="email" placeholder="E-mail" value={userData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Mot de passe" value={userData.password} onChange={handleChange} required />
          <input name="number" placeholder="Numéro de téléphone" value={userData.number} onChange={handleChange} required />
          <input name="address" placeholder="Adresse" value={userData.address} onChange={handleChange} />
          <input name="country" placeholder="Pays" value={userData.country} onChange={handleChange} />
          <input name="city" placeholder="Ville" value={userData.city} onChange={handleChange} />
          <input name="postalCode" placeholder="Code Postal" value={userData.postalCode} onChange={handleChange} />
          <input name="instagram" placeholder="Instagram" value={userData.instagram} onChange={handleChange} />
          <input name="tiktok" placeholder="TikTok" value={userData.tiktok} onChange={handleChange} />
          <label style={{ textAlign: 'left' }}>
            <input type="checkbox" name="isAdmin" checked={userData.isAdmin} onChange={handleChange} />
            Admin
          </label>
          <button type="submit">Créer</button>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};