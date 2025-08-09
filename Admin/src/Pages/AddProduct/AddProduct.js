import "./AddProduct.css"
import { Stage, Layer, Image, Transformer, Rect } from "react-konva";
import useImage from "use-image";
import { Fragment, useRef, useEffect, useState } from "react";
import { UilImageDownload, UilCalculator } from "@iconscout/react-unicons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  }
};

export const AddProduct = () => {

    const [formData, setFormData] = useState({
    _id:"",
    fournisseur: "",
    category: "",
    subcategory: "",
    purchase: 0,
    tags: [],
    colors: {},
    pack: [],
    imgs:{front: {img: "", mask:""}, back: {img: "", mask:""}},
    frontX: 50,
    frontY: 50,
  });

  const [allSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [newColor, setNewColor] = useState("");
  const navigate = useNavigate()

    useEffect(() => {
    const initialPack = selectedSizes.map(() => 0); // un zéro par taille
    setFormData({...formData, pack: initialPack})
  }, [selectedSizes]);

  const handlePackChange = (index, value) => {
    const newPack = [...formData.pack];
    newPack[index] = Number(value);
    setFormData({...formData, pack: newPack})
  };

  const handleImageChange = (e, field) => {
    setFormData({ ...formData, frontY: Number(e.target.value) })
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

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

  const updatedColors = { ...formData.colors };

  Object.keys(updatedColors).forEach(color => {
    if (newSelectedSizes.includes(size)) {
      if (!(size in updatedColors[color])) {
        updatedColors[color][size] = 0;
      }
    } else {
      delete updatedColors[color][size];
    }
  });

  setFormData(prev => ({
    ...prev,
    colors: updatedColors
  }));
};


const handleAddColor = () => {
  if (!newColor) return;

  if (formData.colors.hasOwnProperty(newColor)) return;

  const initialSizes = {};
  selectedSizes.forEach(size => {
    initialSizes[size] = 0;
  });

  setFormData(prev => ({
    ...prev,
    colors: {
      ...prev.colors,
      [newColor]: initialSizes
    }
  }));

  setNewColor("");
};

const handleQuantityChange = (colorName, size, value) => {
  setFormData(prev => {
    const updatedColorSizes = {
      ...prev.colors[colorName],
      [size]: Number(value)
    };

    return {
      ...prev,
      colors: {
        ...prev.colors,
        [colorName]: updatedColorSizes
      }
    };
  });
};

const handlePackQuantityChange = (colorName, pack) => {
  setFormData(prev => {
    const currentSizes = prev.colors[colorName] || {};

    const updatedColorSizes = Object.fromEntries(
      Object.entries(currentSizes).map(([size, quantity]) => [
        size,
        quantity * pack
      ])
    );

    return {
      ...prev,
      colors: {
        ...prev.colors,
        [colorName]: updatedColorSizes
      }
    };
  });
};








const [tagInput, setTagInput] = useState("");
const [displayedColor, setDisplayedColor] = useState("")
const [showScale, setShowScale] = useState(false);
const [selectedColor,setSelectedColor] = useState(formData.colors? formData.colors[0] : "white");
const [frontImages, setFrontImages] = useState([]);
const [backImages, setBackImages] = useState([]);
const [selectedImage, setSelectedImage] = useState(false);
const [selectedImageId, setSelectedImageId] = useState(null);
const [displayedProductSide, setDisplayedProductSide] = useState("front");
const [imageFront,imageFrontStatus] = useImage(formData.imgs.front.img);
const [imageBack,imageBackStatus] = useImage(formData.imgs.back.img);
const [imageFrontMask,imageFrontMaskStatus] = useImage(formData.imgs.front.mask);
const [imageBackMask,imageBackMaskStatus] = useImage(formData.imgs.back.mask);
const [transformCoords, setTransformCoords] = useState({left:100,top:100,width:100,height:100,scaleX:1,scaleY:1});


  
const frontStageRef = useRef(null);
const backStageRef = useRef(null);
const productFrontColor = useRef();
const productFrontMask = useRef();
const productBackColor = useRef();
const productBackMask = useRef();
const productFrontImage = useRef();
const productBackImage = useRef();
const sizeInputRef = useRef();

const handleImageFrontUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setFormData(prev => ({
      ...prev,
      imgs: {
        ...prev.imgs,
        front: {
          ...prev.imgs.front,
          img: reader.result
        }
      }
    }));
  };
  reader.readAsDataURL(file);
};

const handleMaskFrontUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setFormData(prev => ({
      ...prev,
      imgs: {
        ...prev.imgs,
        front: {
          ...prev.imgs.front,
          mask: reader.result
        }
      }
    }));
  };
  reader.readAsDataURL(file);
};

const handleImageBackUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setFormData(prev => ({
      ...prev,
      imgs: {
        ...prev.imgs,
        back: {
          ...prev.imgs.back,
          img: reader.result
        }
      }
    }));
  };
  reader.readAsDataURL(file);
};

const handleMaskBackUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setFormData(prev => ({
      ...prev,
      imgs: {
        ...prev.imgs,
        back: {
          ...prev.imgs.back,
          mask: reader.result
        }
      }
    }));
  };
  reader.readAsDataURL(file);
};



function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const [card, setCard] = useState("")

  const handleExport = (side) => {
    let uri
    if(side === "front"){
    productFrontColor.current.visible(false);
    productFrontMask.current.visible(false);
    productFrontImage.current.visible(false);
    uri = frontStageRef.current.toDataURL();
    setCard(uri)
    }
    else{
    productBackColor.current.visible(false);
    productBackMask.current.visible(false);
    productBackImage.current.visible(false)
    uri = backStageRef.current.toDataURL();
    }
    console.log(uri);
    // we also can save uri as file
    downloadURI(uri, 'stage.png');
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

  const handleCategoryChange = (e) => {
    const categoryTitle = e.target.value;
    const category = categories.find(cat => cat.title === categoryTitle);

    setFormData(prev => ({
      ...prev,
      category: categoryTitle,
    }));
    setSubcategories(category.subcategories)
  };

const generateProductId = (fournisseur, category, subcategory) => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedSupplier = fournisseur.trim().toLowerCase().replace(/\s+/g, '');
  const formattedCategory = category.trim().toLowerCase().replace(/\s+/g, '');
  const formattedSubcategory = subcategory.trim().toLowerCase().replace(/\s+/g, '');

  return `${formattedSupplier}_${formattedCategory}_${formattedSubcategory}_${day}${month}${year}`;
};

const handleGenerateId = () => {  
  const generatedId = generateProductId(
    formData.fournisseur,
    formData.category,
    formData.subcategory
  );

  if(!formData.fournisseur){
    alert("Remplir Frounisseur !!")
    return
  }
  if(!formData.category){
    alert("Remplir Categorie !!")
    return
  }
    if(!formData.subcategory){
    alert("Remplir Sous-categorie !!")
    return
  }

  setFormData(prev => ({ ...prev, _id: generatedId }));
};

const {currentUser} = useSelector((state) => state.auth);

const handleSubmit = async () => {
  const productData = {
_id: formData._id,
    fournisseur: formData.fournisseur,
    category: formData.category,
    subcategory: formData.subcategory,
    tags: formData.tags,
    imgs: [
      { type: "front", img: formData.imgs.front.img, mask: formData.imgs.front.mask },
      { type: "back", img: formData.imgs.back.img, mask: formData.imgs.back.mask }
    ],
    colorsAndSizes: formData.colors,
    pack: formData.pack,
    purchase: formData.purchase,
    rate: 5,
    description: formData.description || ""
  };

  try {
    const res = await axios.post(
      "http://localhost:4000/api/products", 
      productData,
      {
        headers: {
          Authorization: currentUser.token,
          // Ne pas inclure "Content-Type"
        },
      }
    );
    console.log("Produit ajouté :", res.data);
      await toast('Produit ajouté avec succées!',{
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
      navigate("/products");
    }, 2000);
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit :", err);
    alert("Erreur lors de la sauvegarde !");
  }
};
  
  return (
    <div className="add-product-container">
      <div className="add-product-grid">
        <div className="add-product-grid-item">
            <h1>Ajouter produit</h1>
            <h4>Ref du produit</h4>
            <div className="add-product-colors-input">
              <input
                type="text"
                placeholder="ID du produit"
                value={formData._id || ''}
                readOnly
                onChange={(e) => setNewColor(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddColor();
                  }
                }}
              />
              <button type="button" onClick={handleGenerateId}>
                Générer ID
              </button>
            </div>
            <div style={{display: "flex"}}>
              <div>
                <h4 className="block font-semibold mb-1">Product Front Image</h4>
                <input 
                type="file" 
                accept="image/*" 
                onChange={
                  (e) => {
                    handleImageFrontUpload(e)
                  }
                } 
                />
                <h4 className="block font-semibold mb-1">Product Front mask</h4>
                <input 
                type="file" 
                accept="image/*" 
                onChange={
                  (e) => {
                    handleMaskFrontUpload(e)
                  }
                } 
                />
              </div>

              <div>
                <h4 className="block font-semibold mb-1">Product Back Image</h4>
                <input 
                type="file" 
                accept="image/*" 
                onChange={
                  (e) => {
                    handleImageBackUpload(e)
                  }
                } 
                />
                <h4 className="block font-semibold mb-1">Product Back mask</h4>
                <input 
                type="file" 
                accept="image/*" 
                onChange={
                  (e) => {
                    handleMaskBackUpload(e)
                  }
                } 
                />
              </div>
          </div>
            <h4>Description du produit</h4>
            <div className="add-product-input">
              <textarea onChange={(e)=>{setFormData({...formData, description: e.target.value})}} type="text" className="add-product-input-paragraph" placeholder="Description du produit"/>
            </div>
            <div className="add-product-price">
              <div>
                <h4>Fournisseur</h4>
                <div className="add-product-input">
                  <textarea type="text" 
                  onChange={(e)=>
                  setFormData(prev => ({
                    ...prev,
                    fournisseur: e.target.value,
                  }))
                  } 
                  className="add-product-input-text" placeholder="Fournisseur"/>
                </div>
              </div>
              <div>
                <h4>Prix d'achat</h4>
                <div className="add-product-input">
                  <textarea onChange={(e)=>{setFormData({...formData, purchase: e.target.value})}} type="text" className="add-product-input-text" placeholder="Prix d'achat"/>
                </div>
              </div>
            </div>
            <div className="add-product-categories">
              <div>
                <h4>Catégorie</h4>
                <select
                  className="add-product-input"
                  value={formData.category}
                  onChange={(e) => {handleCategoryChange(e);}}
                >
                  <option value="">Select catégorie</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat.title}>{cat.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <h4>Sous-Catégorie</h4>
                <select onChange={(e)=>{setFormData({...formData, subcategory: e.target.value})}} className="add-product-input">
                  <option value="" >Select sous-catégorie</option>
                  {subcategories?.map((sub, index) => (
                    <option key={index} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
            <h4>Tailles</h4>
            <div className="add-product-sizes-container">
              {allSizes.map((size) => (
                <label key={size} className="add-product-sizes-label">
                  <input
                    type="checkbox"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={()=>handleSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
      <h4>Couleurs</h4>
      <div className="add-product-colors">
        {Object.entries(formData.colors).map((color, index) => (          
          <div className="choose-color" style={{backgroundColor:color[0]}} key={index}>
            <button
              type="button"
              onClick={() => {
                const updatedColors = { ...formData.colors };                
                delete updatedColors[color[0]];

                setFormData({ ...formData, colors: updatedColors });
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="add-product-colors-input">
        <input
          type="text"
          placeholder="Enter color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddColor();
            }
          }}
        />
        <button
          type="button"
          onClick={(e) => {
            handleAddColor()
          }
          }
        >
          Add
        </button>
      </div>
      <div className="quatity-container">
        <h4>Quantité</h4>
        <div style={{display: "flex"}}> <b style={{marginRight: "10px"}}>Pack:</b>
         {formData && selectedSizes?.map(([size, quantity], index) => (
            <div className="color-sizes" key={size} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
             <h4>{size}:</h4>
              <input
                className="size-quantity"
                type="number"
                value={formData.pack[index] || 0}
                onChange={(e) => handlePackChange(index, e.target.value)}
                min={0}
               />
            </div>
          ))}
        </div>
          <div className="add-product-colors-quantity">
            {Object.entries(formData.colors).length<=0 
            ? 
            <h2 style={{color:"red"}}>Choisir tailles et couleurs !</h2> 
            : 
            Object.entries(formData.colors).map(([colorName, sizes], index) => (     
              <div className="color-sizes">
                <div 
                className="choose-color" 
                onClick={() => {
                setDisplayedColor(colorName)
                }}
                style={{backgroundColor:colorName}} 
                key={index}
                >
                  <button
                    type="button"
                  >
                  </button>
                </div>
                {
                  selectedSizes?.map((size)=>(
                    <>
                    <div className={{display: "flex", flexDirection: "column"}}>
                      <h4>{size}:</h4>
                      <input 
                      className="size-quantity"
                      type="number" 
                      value={formData.colors[colorName]?.[size] ?? 0}
                      min={0}
                      onChange={(e)=>handleQuantityChange(colorName, size, e.target.value,1)} 
                      />
                    </div>

                {                
                size === Object.keys(formData.colors[colorName])[Object.keys(formData.colors[colorName]).length-1] && <div className="pack-qte">
                  <div style={{display: "flex"}}>
                  <h4>Pack</h4>
                  <input
                  ref={sizeInputRef}
                  className="size-quantity"
                  type="number"
                  min={0}
                  defaultValue={0}
                  />
                  </div>
                  <button
                  style={{cursor: "pointer"}}
                  onClick={(e) => {
                    const packValue = sizeInputRef.current.value;
                    handlePackQuantityChange(colorName, packValue);
                  }}
                  >
                    <UilCalculator/>
                  </button>
                </div>
                }  
                </>                
                ))
                }
              </div>     
        ))}
      </div>
      </div>
      <div>
      <h4>Tags</h4>
      <div className="add-product-tags">
        {formData.tags.map((tag, index) => (
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
          <div className="category-publish-buttons">
            <button onClick={handleSubmit}>Sauvegarder !</button>
          </div>
        </div>
      <div>
{/* {formData.frontImage && (
  <div className="add-product-display" style={{ position: "relative" }}>
    Base T-shirt 
    <img
      src="/images/tshirt png.png"
      alt="T-shirt"
      className="display-product-design"
    />

    Color overlay
    <div 
      style={{
        width: "90%",
        height: "100%",
        backgroundColor: displayedColor,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "multiply",
      }}
    ></div>

      T-shirt mask
    <img
      src="/images/tshirt mask.png"
      alt="T-shirt"
      className="display-product-design"
    />

     Interactive design stage
    <div
      style={{
        position: "absolute",
        top: "3%",
        left: "3%",
        width: "95%",
        height: "95%",
        pointerEvents: "none", // Prevents issues with clicking through
      }}
    >
      <Stage width={500} height={500}>
        <Layer>
          <DraggableResizableImage
            src={formData.frontImageUrl}
            isSelected={true}
            onSelect={() => {console.log(formData);}}
            onChange={() => {}}
          />
        </Layer>
      </Stage>
    </div>
  </div>
)} */}
<div style={{position: "relative"}}>
  <h2>Front</h2>
         { 
          <div style={{position: "absolute"}} >
        <Stage
          ref={frontStageRef}
          width={500}
          height={500}
        >
      <Layer>
      {imageFrontStatus === 'loaded' &&
        <Fragment>
        <Image 
        ref={productFrontImage}
        image={imageFront}
        width={500}
        height={500}
      />
      <Rect
      ref={productFrontColor}
      fill={displayedColor}
      x={1}
      y={1}
      width={498}
      height={500}
      globalCompositeOperation="multiply"
      opacity={0.9}
    />
      <Image
      ref={productFrontMask}
      image={imageFrontMask}
      width={500}
      height={500}
      />
      </Fragment>
      }
      </Layer>
    </Stage> 
    </div>
    }


  <h2 style={{position: "absolute", top: "540px"}}>Back</h2>
         { 
          <div style={{position: "absolute", top: "600px"}} >
        <Stage
          ref={backStageRef}
          width={500}
          height={500}
        >
      <Layer>
      {imageFrontStatus === 'loaded' &&
        <Fragment>
        <Image 
        ref={productBackImage}
        image={imageBack}
        width={500}
        height={500}
      />
      <Rect
      ref={productBackColor}
      fill={displayedColor}
      x={1}
      y={1}
      width={498}
      height={500}
      globalCompositeOperation="multiply"
      opacity={0.9}
    />
      <Image
      ref={productBackMask}
      image={imageBackMask}
      width={500}
      height={500}
      />
      </Fragment>
      }
      </Layer>
    </Stage> 
    </div>
    }
</div>
      </div>
      </div>
      <ToastContainer position="top-right"/>
    </div>
  )

}
