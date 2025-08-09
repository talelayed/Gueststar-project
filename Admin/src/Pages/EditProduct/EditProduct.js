import "./EditProduct.css"
import useImage from "use-image";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import {UilMinus, UilPlus} from "@iconscout/react-unicons"
import { UilCalculator } from "@iconscout/react-unicons";


export const EditProduct = () => {
  const {product_id} = useParams();
  const [product, setProduct] = useState([]);
  const sizeInputRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${product_id}`);
        setProduct(res.data);
        console.log(res.data.product);
        
        Object.entries(res.data.product.colorsAndSizes).map(([colorName, sizes], index) =>console.log(colorName,sizes))
        
        
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const params = useParams();
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
    _id: product_id,
    title: "",
    theme: "",
    cost: 0,
    discount: 0,
    description: 0,
    price: 0,
    tags: [],
    imgs:{front: "/images/tshirt png.png", back: "/images/tshirt png.png"},
    frontX: 50,
    frontY: 50,
  });

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleAddTag = () => {
  const trimmed = tagInput.trim();
  if (trimmed && !formData.tags?.includes(trimmed)) {
    setFormData({ ...formData, tags: [...formData.tags, trimmed] });
    setTagInput("");
  }
};

const handleSizeChange = (size) => {
  const newSelectedSizes = selectedSizes.includes(size)
    ? selectedSizes.filter((s) => s !== size)
    : [...selectedSizes, size];

  setSelectedSizes(newSelectedSizes);

  // Mettre à jour les tailles pour chaque couleur dans formData.colors
  const updatedColors = { ...formData.colors };
  Object.keys(updatedColors).forEach((color) => {
    const colorSizes = { ...updatedColors[color] };

    // Ajouter la taille si elle n'existe pas
    if (!colorSizes[size]) {
      colorSizes[size] = 0;
    }

    // Supprimer la taille si elle a été décochée
    if (!newSelectedSizes.includes(size)) {
      delete colorSizes[size];
    }

    updatedColors[color] = colorSizes;
  });

  setFormData({ ...formData, colors: updatedColors });
};

const [tagInput, setTagInput] = useState("");
const [displayedColor, setDisplayedColor] = useState(product.product)
const [showScale, setShowScale] = useState(false);
const [frontImages, setFrontImages] = useState([]);
const [backImages, setBackImages] = useState([]);

  const [frontDesign, setFrontDesign] = useState("")
  const [backDesign, setBackDesign] = useState("")

  // upload the image by the user
const handleImageBackUpload = (e) => {
  const files = e.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;

      img.onload = () => {
        const aspectRatio = img.height / img.width;
        // Create a new image object with id, image source, and initial position
        const newImage = {
          _id: Date.now() + i, // Generate unique id for each image
          image: img,
          x: 140 + i * 150, // Set initial X position
          y: 70, // Set initial Y position
          width: 210, // Set initial width
          height: 210 * aspectRatio, // Set initial height
          scaleX: 1,
          scaleY: 1
        };

        // Set the state with the updated images array
        setBackImages((prevImages) => [...prevImages, newImage]);

      };
    };

    reader.readAsDataURL(file);
  }
};

  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (product?.colorsAndSizes && Object.keys(product.colorsAndSizes).length > 0) {
    setDisplayedColor(Object.keys(product.colorsAndSizes)[0]);
  }
}, [product?.colorsAndSizes]);

const {currentUser} = useSelector((state) => state.auth);

const handleSubmitTOB2B = async () => {
const designData = {
  title: formData.title,
  linkedProduct: product?._id,
  price: formData.price,
  cost: formData.cost,
  description: product?.description + " \n " + formData.description,
  theme: formData.theme,
  imgs: {front: frontDesign, back:backDesign},
  discount: formData.discount,
  tags: formData.tags,
  rate: 5
};



  try {
    const res = await axios.post(
      "http://localhost:4000/api/designs", 
      designData,
      {
        headers: {
          Authorization: currentUser.token,
          // Ne pas inclure "Content-Type"
        },
      }
    );
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
    setTimeout(() => {
      navigate("/designs");
    }, 2000);
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit :", err);
    alert("Erreur lors de la sauvegarde !");
  }
};

// Met à jour la quantité d’une taille spécifique dans une couleur spécifique
const handleQuantityChange = (color, size, value, mode) => {
  setFormData(prev => {
    const updated = { ...prev };

    if (!updated.colorsAndSizes[color]) {
      updated.colorsAndSizes[color] = {};
    }

    const numericValue = parseInt(value) || 0;
    updated.colorsAndSizes[color][size] = numericValue;

    return updated;
  });
};

// Multiplie les valeurs actuelles d’un pack (rempli par utilisateur)
const handlePackQuantityChange = (color, packValue) => {
  const pack = parseInt(packValue);
  if (!pack || pack <= 0) return;

  setFormData(prev => {
    const updated = { ...prev };

    if (!updated.colorsAndSizes[color]) {
      updated.colorsAndSizes[color] = {};
    }

    const colorSizes = updated.colorsAndSizes[color];
    for (let size in colorSizes) {
      const current = colorSizes[size] || 0;
      colorSizes[size] = current * pack;
    }

    return updated;
  });
};

// Incrémente la quantité d'une taille
const incrementSize = (color, size) => {
  setFormData(prev => {
    const updated = { ...prev };
    if (!updated.colorsAndSizes[color]) {
      updated.colorsAndSizes[color] = {};
    }
    updated.colorsAndSizes[color][size] = (updated.colorsAndSizes[color][size] || 0) + 1;
    return updated;
  });
};

// Décrémente la quantité d'une taille
const decrementSize = (color, size) => {
  setFormData(prev => {
    const updated = { ...prev };
    if (!updated.colorsAndSizes[color]) {
      updated.colorsAndSizes[color] = {};
    }
    const current = updated.colorsAndSizes[color][size] || 0;
    if (current > 0) {
      updated.colorsAndSizes[color][size] = current - 1;
    }
    return updated;
  });
};


  return (
    <div className="add-product-container">
      <div className="add-product-grid">
        <div className="add-product-grid-item">
            <h1>Modifier produit</h1>
            <h4>Ref du produit</h4>
            <div className="add-product-input">
              <input
              value={product.product?._id}
              readOnly
              className="add-product-input-text" 
              />
            </div>
            <div className="add-product-categories">
              <div>
                <h4>Catégorie</h4>
                  <input className="add-product-details" type="text" readOnly value={product.product?.category}/>
              </div>
              <div>
                <h4>Sous-Catégorie</h4>
                  <input className="add-product-details" type="text" readOnly value={product.product?.subcategory}/>
              </div>
            </div>
            <h4>Description du produit</h4>
            <div className="add-product-input">
              <textarea 
              value={product.product?.description}
              onChange={(e)=>{
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value
                    }));
              }}
              type="text" 
              className="add-product-input-paragraph" 
              placeholder="Description du produit"/>
            </div>
            <div className="add-product-price">
              <div>
                <h4>Prix d'achat (€)</h4>
                <div className="add-product-input">
                  <textarea
                  value={product.product?.purchase}
                  onChange={(e)=>{
                    setFormData(prev => ({
                      ...prev,
                      price: e.target.value
                    }));
                  }}
                   type="text" 
                   className="add-product-input-text" 
                   placeholder="Prix de vente"/>
                </div>
              </div>
            </div>
      <div className="quatity-container">
        <h4>Quantité disponible</h4>
      <div className="add-product-colors-quantity">
        {
          <div className="add-product-colors-quantity">
            {product.product?.colorsAndSizes && Object.entries(product.product?.colorsAndSizes)?.map(([colorName, sizes], index) => (
              <div>
              <div className="color-sizes" key={index}>
                <div
                  className="choose-color"
                  onClick={() => setDisplayedColor(colorName)}
                  style={{ backgroundColor: colorName }}
                >
                  <button type="button"></button>
                </div>
                {/* Quantité principale de pièces de ce couleur */}
                {product && Object.entries(sizes)?.map(([size, quantity]) => (
                  <div key={size} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <h4>{size}:</h4>
                    <input
                      readOnly
                      type="number"
                      value={formData.colorsAndSizes?.[colorName]?.[size] ?? quantity}
                    />
                  </div>
                ))}
              </div>
              <div className="color-sizes" style={{marginTop:"10px"}} key={index}>
                {/* 
                But: mettre à jour la quantité de pièces de ce couleur
                1. remplir les champs de tailles d'un pack
                2. remplir le nombre de packs 
                3. appuyer sur le boutton pour multiplier la valeur du champs pack à chaque valeur des tailles
                4. appuyer sur + ou - pour mettre à jour la quantité principale 
                */}
                {product && Object.entries(sizes)?.map(([size, quantity]) => (
                  <div key={size} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <h4>{size}:</h4>
                    <input
                      className="size-quantity"
                      type="number"
                      value={0}
                      onChange={(e)=>handleQuantityChange(colorName, size, e.target.value,1)} 
                    />
                  </div>
                ))}
                  <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                  <h4>Pack</h4>
                  <input
                  className="size-quantity"
                  type="number"
                  defaultValue={0}
                  
                  />
                  
                  <button
                  style={{cursor: "pointer"}}
                  onClick={(e) => {
                    const packValue = sizeInputRef.current.value;
                    handlePackQuantityChange(colorName, packValue);
                  }}
                  >
                    <UilCalculator/>
                  </button>
                    <UilPlus 
                    color="red" 
                    style={{ cursor: "pointer" }} 
                    onClick={() => incrementSize(colorName, "S")} // Remplace "S" par la vraie taille si dynamique
                    />
                    <UilMinus 
                    color="red" 
                    style={{ cursor: "pointer" }} 
                    onClick={() => decrementSize(colorName, "S")} 
                    />

                </div>
              </div>
              <hr style={{width: "80%", opacity:"50%", marginTop: "30px"}}/>
              </div>
            ))}
          </div>
        }
      </div>

      </div>
      <div>
      <h4>Tags</h4>
      <div className="add-product-tags">
        {product.product?.tags?.map((tag, index) => (
          <span
            key={index}
          >
            {tag}
            <button
              type="button"
              onClick={() => {
                const updated = formData.tags.filter((_, i) => i !== index);
                setFormData({ ...formData, tags: updated });
              }}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="add-product-tags-input">
        <input
          type="text"
          placeholder="Enter tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAddTag}
        >
          Add
        </button>
      </div>
    </div>

          <div className="publish-buttons">
            <button onClick={()=>handleSubmitTOB2B()} className="B2B-button">Mettre à jour</button>
          </div>
        </div>
      <div>
<div style={{position: "relative"}}>
  <h2>Front</h2>
        <img 
        alt="product-image"
        src={product.product?.imgs[0].img}
        style={{position:"absolute"}}
        width={500}
        height={500}
        />
        <div
        fill={displayedColor}
        style={{position:"absolute",backgroundColor: displayedColor, width: "498px", height: "500px", mixBlendMode:"multiply", opacity: "0,9"}}
        x={1}
        y={1}
        />
        <img
        alt="product-mask"
        src={product.product?.imgs[0].mask}
        style={{position:"absolute"}}
        width={500}
        height={500}
        />
</div>
<div style={{position: "relative"}}>
  <h2 style={{position: "absolute", top: "540px"}}>Back</h2>
        <img 
        alt="product-image"
        src={product.product?.imgs[0].img}
        style={{position:"absolute",top: "620px"}}
        width={500}
        height={500}
        />
        <div
        fill={displayedColor}
        style={{position:"absolute",top: "620px",backgroundColor: displayedColor, width: "498px", height: "500px", mixBlendMode:"multiply", opacity: "0,9"}}
        x={1}
        y={1}
        />
        <img
        alt="product-mask"
        src={product.product?.imgs[0].mask}
        style={{position:"absolute",top: "620px"}}
        width={500}
        height={500}
        />

</div>
      </div>
      </div>
      <ToastContainer position="top-right"/>
    </div>
  )
}