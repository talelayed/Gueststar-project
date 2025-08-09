import React, { useState } from "react";
import "./ProfileImageUploader.css";

const ProfileImageUploader = ({ onImageSelect }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setImage(file);
      onImageSelect(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="uploader-container">
      {preview && (
        <img src={preview} alt="Profile Preview" className="profile-image" />
      )}

      <label className="upload-button">
        Choisir une image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden-input"
        />
      </label>
    </div>
  );
};

export default ProfileImageUploader;
