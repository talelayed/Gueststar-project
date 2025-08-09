import { useEffect, useState } from "react";
import "./AddCategory.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";

export const AddCategory = () => {
  const [category, setCategory] = useState("")
  const [subcategoryInput, setSubcategoryInput] = useState("");
  const [subCategories, setSubCategories] = useState([])

  const handleAddCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleAddSubcategorie = () => {
  const trimmed = subcategoryInput.trim();
  if (trimmed && !subCategories?.includes(trimmed)) {
    setSubCategories([...subCategories, trimmed]);
    setSubcategoryInput("");
  }
};

const {currentUser} = useSelector((state) => state.auth);

const addCategory = async (title, subcategories) => {    
  console.log(title, subcategories);

//   const token = localStorage.getItem("token"); // Récupérer le token JWT
const token = currentUser.token

  try {
    const response = await axios.post(
      "http://localhost:4000/api/categories/",
      { title, subcategories },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        // withCredentials: true, // Si ton backend gère les sessions/cookies
      }
    );

    console.log("Catégorie ajoutée :", response.data);
      await toast('Catégorie ajoutée avec succées!',{
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
    console.error("Erreur lors de l'ajout de la catégorie :", error);
  }
};
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([])
  useEffect(() => {
    const loadCategories = async () => {

      try {
        const response = await axios.get("http://localhost:4000/api/categories", {
        });
        setCategories(response.data.categories);

      } catch (error) {
        console.error("Erreur de chargement des catégories", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="add-category-container">
      <div className="add-category-grid">
        <div>
        <div className="add-category-grid-item">
            <h1>Ajouter catégorie</h1>
            <h4>Nom de la catégorie</h4>
            <div className="add-category-input">
              <input 
              onChange={handleAddCategory}
              className="add-category-input-text" 
              placeholder="Nom de la catégorie"
              />
            </div>
        </div>
      <h4>Sous-catégories</h4>
      <div className="add-category-tags">
        {subCategories?.map((subcategory, index) => (
          <span
            key={index}
          >
            {subcategory}
            <button
              type="button"
              onClick={() => {
                const updated = subCategories.filter((_, i) => i !== index);
                setSubCategories(updated);
              }}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="add-category-tags-input">
        <input
          type="text"
          placeholder="Ajouter sous-catégorie"
          value={subcategoryInput}
          onChange={(e) => setSubcategoryInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSubcategorie();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAddSubcategorie}
        >
          Add
        </button>
      </div>
          <div className="category-publish-buttons">
            <button onClick={()=>{addCategory(category, subCategories)}}>Publier !</button>
          </div>
      <div className="category-list">
        <h2>Catégories existantes :</h2>
        <ul>
          {categories.length === 0 ? (
            <p>Aucune catégorie disponible.</p>
          ) : (
            categories.map((cat, index) => (
              <li key={index}>
                <strong>{cat.title}</strong>
                {cat.subcategories?.length > 0 && (
                  <ul>
                    {cat.subcategories.map((sub, i) => (
                      <li key={i} style={{ marginLeft: "20px" }}>{sub}</li>
                    ))}
                  </ul>
                )}
              </li>
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
