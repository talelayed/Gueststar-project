import React, { useEffect, useState } from "react";
import "./ProfileImagePreview.css";

export const ProfileImagePreview = ({ onImageUpload, initialPreview }) => {
  const [preview, setPreview] = useState(initialPreview || null);

  useEffect(() => {
    if (initialPreview) setPreview(initialPreview);
  }, [initialPreview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onImageUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="uploader-container">
      {preview && <img src={preview} alt="Profile Preview" className="profile-image" />}
      <label className="upload-button">
        Choisir une autre image
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
