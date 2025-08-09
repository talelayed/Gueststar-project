import { useEffect, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ProfileImageUploader from "../../Components/ProfileImageUploader/ProfileImageUploader";
import { ProfileImagePreview } from "../../Components/ProfileImagePreview/ProfileImagePreview";

export const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    img: "",
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

  const [profileImage, setProfileImage] = useState("");

  // Charger les infos du currentUser
  useEffect(() => {
    if (currentUser) {
      setUserData({ ...currentUser });
      setProfileImage(currentUser.img || "");
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageUpload = (imgDataUrl) => {
    setProfileImage(imgDataUrl);
    setUserData((prev) => ({ ...prev, img: imgDataUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/workers/${currentUser._id}`, userData);
      toast.success("Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      toast.error("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <div>
      <h1 className="add-worker-title">Votre Profile</h1>
      <div className="add-worker-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="profile-image-container">
            <ProfileImagePreview onImageUpload={handleImageUpload} initialPreview={currentUser.worker.img} />
          </div>
          <input name="name" placeholder="Nom" value={currentUser.worker.name} onChange={handleChange} />
          <input name="surname" placeholder="Prénom" value={currentUser.worker.surname} onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" value={currentUser.worker.email} onChange={handleChange} />
          <input name="number" placeholder="Numéro de téléphone" value={currentUser.worker.number} onChange={handleChange} />
          <input name="address" placeholder="Adresse" value={currentUser.worker.address} onChange={handleChange} />
          <input name="country" placeholder="Pays" value={currentUser.worker.country} onChange={handleChange} />
          <input name="city" placeholder="Ville" value={currentUser.worker.city} onChange={handleChange} />
          <input name="postalCode" placeholder="Code Postal" value={currentUser.worker.postalCode} onChange={handleChange} />
          <input name="instagram" placeholder="Instagram" value={currentUser.worker.instagram} onChange={handleChange} />
          <input name="tiktok" placeholder="TikTok" value={currentUser.worker.tiktok} onChange={handleChange} />
          <label style={{ textAlign: 'left' }}>
            <input type="checkbox" name="isAdmin" checked={currentUser.worker.isAdmin} onChange={handleChange} />
            Admin
          </label>
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};
