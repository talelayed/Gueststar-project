import "./AddDesign.css"
import { Stage, Layer, Image, Transformer, Rect } from "react-konva";
import useImage from "use-image";
import { Fragment, useRef, useEffect, useState } from "react";
import { UilImageDownload, UilProcess } from "@iconscout/react-unicons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  }
};

const CustomImage = ({ productSide, imageProps, isSelected, onSelect, handleDeleteImage, showScale}) => {

  const imageRef = useRef();
  const frontTrRef = useRef();
  const backTrRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      if( productSide === "front" )
      frontTrRef.current.nodes([imageRef.current]);
      else
      backTrRef.current.nodes([imageRef.current]);
    }
  }, [isSelected]);

  const [deleteIcon] = useImage("/corbeille.png");

  // useEffect(() => {
  
  // }, [imageRef?.current?.attrs])
  

  return(
    <Fragment>
      <Image
        {...imageProps}
        // onClick={()=>handleImageClick(img._id)}
        onClick={()=>{onSelect(imageRef,true,true)}}
        onDragMove={()=>onSelect(imageRef,true,false)}
        onTransform={()=>onSelect(imageRef,true,false)}
        ref={imageRef}
        draggable
      />
        {
          isSelected && (<Fragment>
      <Transformer
        ref={productSide==="front" ? frontTrRef : backTrRef}
        // anchorFill="transparent" // Set fill color to transparent
        // anchorStroke="transparent"
        anchorSize={5}
        borderEnabled={false}
        rotateEnabled={true}
        rotationSnaps={[0, 90, 180, 270]}
      />
      <Image 
        image={deleteIcon} 
        onClick={handleDeleteImage} 
        width={13}
        height={15}
        onMouseOver={() => (document.body.style.cursor = 'pointer')}
        onMouseOut={() => (document.body.style.cursor = 'default')}
        x={imageRef?.current?.attrs?.x + (imageRef?.current?.attrs?.width)*(imageRef?.current?.attrs?.scaleX)/2 -6}
        y={imageRef?.current?.attrs?.y + (imageRef?.current?.attrs?.height)*(imageRef?.current?.attrs?.scaleY)+30}
        />
        </Fragment>)
            }
    </Fragment>
  )
}



export const AddDesign = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products");
        setProducts(res.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(params.product_id || "");

  useEffect(() => {
    if(products.products?.length>0){
    navigate(`/add-design/${productId}`); 
    const product = products.products.find(elt => elt._id === productId); 
    setSelectedProduct(product);       
    setFormData(prev => ({
          ...prev,
          tags: product?.tags,
        }));
    }
  }, [productId, products]);

    const [formData, setFormData] = useState({
    _id: productId,
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

  const [allSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [newColor, setNewColor] = useState("");

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
const [displayedColor, setDisplayedColor] = useState("")
const [showScale, setShowScale] = useState(false);
const [selectedColor,setSelectedColor] = useState(formData.colors? formData.colors[0] : "white");
const [frontImages, setFrontImages] = useState([]);
const [backImages, setBackImages] = useState([]);
const [selectedImage, setSelectedImage] = useState(false);
const [selectedImageId, setSelectedImageId] = useState(null);
const [displayedProductSide, setDisplayedProductSide] = useState("front");

const [transformCoords, setTransformCoords] = useState({left:100,top:100,width:100,height:100,scaleX:1,scaleY:1});

const frontStageRef = useRef(null);
const backStageRef = useRef(null);
const productFrontColor = useRef();
const productFrontMask = useRef();
const productBackColor = useRef();
const productBackMask = useRef();
const productFrontImage = useRef();
const productBackImage = useRef();

  const handleDeleteImage = (id, side) => {
    setShowScale(false);
    if (side === "front"){
      const updatedImages = frontImages.filter((image) => image._id !== id);
      setFrontImages(updatedImages);
    }
    else if (side === "back"){
      const updatedImages = backImages.filter((image) => image._id !== id);
      setBackImages(updatedImages);
    }
    setSelectedImageId(null);
  };

  const [frontDesign, setFrontDesign] = useState("")
  const [backDesign, setBackDesign] = useState("")

  // upload the image by the user
const handleImageFrontUpload = (e) => {
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
          x: 295 + i * 150, // Set initial X position
          y: 110, // Set initial Y position
          width: 65, // Set initial width
          height: 65 * aspectRatio, // Set initial height
          scaleX: 1,
          scaleY: 1
        };

        // Set the state with the updated images array
        setFrontImages((prevImages) => [...prevImages, newImage]);

      };
    };

    reader.readAsDataURL(file);
  }
};

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


function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  const handleExport = (side) => {
    let uri
    if(side === "front"){
    uri = frontStageRef.current.toDataURL();
    // we also can save uri as file
    downloadURI(uri, formData.title + "-front");
    }
    else{
    uri = backStageRef.current.toDataURL();
    // we also can save uri as file
    downloadURI(uri, formData.title + "-back");
    }
    console.log(uri);
  };

  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({});

useEffect(() => {
  if (selectedProduct?.colorsAndSizes && Object.keys(selectedProduct.colorsAndSizes).length > 0) {
    setDisplayedColor(Object.keys(selectedProduct.colorsAndSizes)[0]);
  }
}, [selectedProduct?.colorsAndSizes]);
  
  const [imageFront,imageFrontStatus] = useImage(selectedProduct?.imgs ? selectedProduct?.imgs[0].img : "");
  const [imageFrontMask,imageFrontMaskStatus] = useImage(selectedProduct?.imgs ? selectedProduct?.imgs[0].mask : "");
  const [imageBack,imageBackStatus] = useImage(selectedProduct?.imgs ? selectedProduct?.imgs[0].img : "");
  const [imageBackMask,imageBackMaskStatus] = useImage(selectedProduct?.imgs ? selectedProduct?.imgs[0].mask : "");


const chooseProduct = (id) => {
  setProductId(id)
  const product = products.products.find(elt => elt._id === id); 
  setSelectedProduct(product);       
  setFormData(prev => ({
        ...prev,
        tags: product.tags,
      }));
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

const prepareDesigns = () => {
    productFrontColor.current.visible(false);
    productFrontMask.current.visible(false);
    productFrontImage.current.visible(false);
    setFrontDesign(frontStageRef.current.toDataURL());
    productBackColor.current.visible(false);
    productBackMask.current.visible(false);
    productBackImage.current.visible(false)
    setBackDesign(backStageRef.current.toDataURL());
}

const {currentUser} = useSelector((state) => state.auth);

const handleSubmitTOB2B = async () => {
const designData = {
  title: formData.title,
  linkedProduct: selectedProduct?._id,
  price: formData.price,
  cost: formData.cost,
  description: selectedProduct?.description + " \n " + formData.description,
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

  return (
    <div className="add-product-container">
      <div className="add-product-grid">
        <div className="add-product-grid-item">
            <h1>Ajouter modèle</h1>
            <div className="add-product-categories">
              <div>
                <h4>Choix produit</h4>
                <select
                  className="add-product-input"
                  value={productId}
                  onChange={(e) => chooseProduct(e.target.value)}
                >
                  <option value="">Select Produit</option>
                  {
                    products.products?.map((product)=>(
                      <option value={product._id}>{product._id}</option>
                    ))
                  }
                </select>
              </div>              
              <div>
                <h4>Catégorie</h4>
                  <input className="add-product-details" type="text" readOnly value={selectedProduct?.category || ""}/>
              </div>
              <div>
                <h4>Sous-Catégorie</h4>
                  <input className="add-product-details" type="text" readOnly value={selectedProduct?.subcategory || ""}/>
              </div>
            </div>
            <h4>Nom du produit</h4>
            <div className="add-product-input">
              <input
              onChange={(e)=>{
                    setFormData(prev => ({
                      ...prev,
                      title: e.target.value
                    }));
              }}
              className="add-product-input-text" 
              placeholder="Nom du produit"/>
            </div>
            <h4>Description du produit</h4>
            <div className="add-product-input">
              <textarea 
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
                <h4>Coût de production</h4>
                <div className="add-product-input">
                  <textarea 
                  type="text" 
                  className="add-product-input-text" 
                  placeholder="Coût de production"
                  onChange={(e)=>{
                    setFormData(prev => ({
                      ...prev,
                      cost: e.target.value
                    }));
                  }} 
                  />
                </div>
              </div>
              <div>
                <h4>Coût total</h4>
                <div className="add-product-input">
                  <textarea readOnly type="text" className="add-product-input-text" value={(selectedProduct?.purchase && formData.cost) ? (parseFloat(selectedProduct?.purchase) + parseFloat(formData.cost)) : selectedProduct?.purchase}/>
                </div>
              </div>
              <div>
                <h4>Prix de vente</h4>
                <div className="add-product-input">
                  <textarea
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
              <div>
                <h4>Promotion (%)</h4>
                <div className="add-product-input">
                  <textarea 
                    onChange={
                    (e)=>{
                      setFormData(prev => ({
                        ...prev,
                        discount: e.target.value
                      }));
                    }
                    } 
                    type="text" 
                    className="add-product-input-text" 
                    placeholder="Promotion"/>
                </div>
              </div>
              <div>
                <h4>Thème</h4>
                <select
                  className="add-product-input"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                >
                  <option value="">Select thème</option>
                  {
                    themes?.map((theme)=>(
                      <option value={theme.title}>{theme.title}</option>
                    ))
                  }
                </select>
              </div>
      <div className="quatity-container">
        <h4>Quantité disponible</h4>
      <div className="add-product-colors-quantity">
        {!selectedProduct ? (
          <h2 style={{ color: "red" }}>Choisir Produit !</h2>
        ) : (
          <div className="add-product-colors-quantity">
            {selectedProduct?.colorsAndSizes && Object.entries(selectedProduct?.colorsAndSizes)?.map(([colorName, sizes], index) => (
              <div className="color-sizes" key={index}>
                <div
                  className="choose-color"
                  onClick={() => setDisplayedColor(colorName)}
                  style={{ backgroundColor: colorName }}
                >
                  <button type="button"></button>
                </div>

                {selectedProduct && Object.entries(sizes)?.map(([size, quantity]) => (
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
            ))}
          </div>
        )}
      </div>

      </div>
      <div>
      <h4>Tags</h4>
      <div className="add-product-tags">
        {formData.tags?.map((tag, index) => (
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
            
            <div style={{display: "flex"}}>
              <div>
              <div>
                <h4 className="block font-semibold mb-1">Front Design</h4>
                <input 
                type="file" 
                accept="image/*" 
                onChange={
                  (e) => {
                    handleImageFrontUpload(e)
                  }
                } 
                />
              </div>

              <div>
                <h4 className="block font-semibold mb-1">Back Design</h4>
                <input 
                type="file" 
                accept="image/*" 
                onChange={
                  (e) => {
                    handleImageBackUpload(e)
                  }
                } 
                />
              </div>
            </div>
          <div>
            <div>
              <h4 className="block font-semibold mb-1">Télécharger Front Image</h4>
              <button
              style={{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",gap:"4px"}}
              onClick = {
                () => handleExport("front")
              }
              >
                Télécharger <UilImageDownload />
              </button> 
            </div>

            <div>
              <h4 className="block font-semibold mb-1">Télécharger Back Image</h4>
              <button
              style={{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",gap:"4px"}}
              onClick = {
                () => handleExport("back")
              }
              >
                Télécharger <UilImageDownload />
              </button> 
            </div>
          </div>
          </div>

            <div>
              <h4 className="block font-semibold mb-1">Préparer les designs</h4>
              <button
              style={{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",gap:"4px"}}
              onClick = {
                () => prepareDesigns()
              }
              >
                Process <UilProcess />
              </button> 
            </div>
          <div className="publish-buttons">
            <button onClick={()=>handleSubmitTOB2B()} className="B2B-button">Publier sur B2B</button>
            <button className="B2C-button">Publier sur B2C</button>
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
          // onClick={()=>{setSelectedImage(!selectedImage)}} 
          ref={frontStageRef}
          // width={window.innerWidth}
          // height={window.innerHeight}
          width={500}
          height={500}
          // onMouseDown={(e)=>checkDeselect(e)}
          // onTouchStart={(e)=>checkDeselect(e)}
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
 {frontImages.map((img, i) => (
  <CustomImage
     productSide="front"
     handleDeleteImage={()=>handleDeleteImage(img._id, "front")}
    key={i}
    imageProps={img}
    isSelected={img._id === selectedImageId && showScale }
    onSelect={(imageRef, boolTr, boolSelect)=>{
      setFrontImages(prevFrontImages => {
        return prevFrontImages.map((image, index) => {
          // Check if the current index matches the index to be modified
          if (index === i) {
            // Update the x and y coordinates of the image
            console.log(imageRef);
            console.log(frontImages);
            
            
            return {
              ...image, // Keep existing properties
              x: imageRef?.current?.attrs?.x, // Update x coordinate
              y: imageRef?.current?.attrs?.y, // Update y coordinate
              scaleX:imageRef?.current?.attrs.scaleX,
              scaleY:imageRef?.current?.attrs.scaleY  
            };
          } else {
            // Return the image unchanged if the index doesn't match
            return image;
          }
        });
      });
      setSelectedImage(true);
      setSelectedImageId(img._id);
      if (boolTr)
      setTransformCoords({
        ...imageRef?.current?.attrs, 
        left:imageRef?.current?.attrs?.x,
        top:imageRef?.current?.attrs?.y,
        scaleX:imageRef?.current?.attrs.scaleX,
        scaleY:imageRef?.current?.attrs.scaleY
      })
      if(boolSelect)
      setShowScale(!showScale);

      // if(!selectedImageId && boolSelect)
      //   setSelectedImageId(img._id);
      // else
      //   setSelectedImageId(null);
    }}
    showScale={showScale}
     />
          )
        )}
      </Layer>
    </Stage> 
    </div>
    }


  <h2 style={{position: "absolute", top: "540px"}}>Back</h2>
         { 
          <div style={{position: "absolute", top: "600px"}} >
        <Stage
          // onClick={()=>{setSelectedImage(!selectedImage)}}
          ref={backStageRef}
          // width={window.innerWidth}
          // height={window.innerHeight}
          width={500}
          height={500}
          // onMouseDown={(e)=>checkDeselect(e)}
          // onTouchStart={(e)=>checkDeselect(e)}
        >
      <Layer>
      {imageBackStatus === 'loaded' &&
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
 {backImages.map((img, i) => (
  <CustomImage
     productSide="back"
     handleDeleteImage={()=>handleDeleteImage(img._id, "back")}
    key={i}
    imageProps={img}
    isSelected={img._id === selectedImageId && showScale }
    onSelect={(imageRef, boolTr, boolSelect)=>{
      setBackImages(prevBackImages => {
        return prevBackImages.map((image, index) => {
          // Check if the current index matches the index to be modified
          if (index === i) {
            // Update the x and y coordinates of the image
            console.log(imageRef);
            return {
              ...image, // Keep existing properties
              x: imageRef?.current?.attrs?.x, // Update x coordinate
              y: imageRef?.current?.attrs?.y, // Update y coordinate
              scaleX:imageRef?.current?.attrs.scaleX,
              scaleY:imageRef?.current?.attrs.scaleY  
            };
          } else {
            // Return the image unchanged if the index doesn't match
            return image;
          }
        });
      });
      setSelectedImage(true);
      setSelectedImageId(img._id);
      if (boolTr)
      setTransformCoords({
        ...imageRef?.current?.attrs, 
        left:imageRef?.current?.attrs?.x,
        top:imageRef?.current?.attrs?.y,
        scaleX:imageRef?.current?.attrs.scaleX,
        scaleY:imageRef?.current?.attrs.scaleY
      })
      if(boolSelect)
      setShowScale(!showScale);

      // if(!selectedImageId && boolSelect)
      //   setSelectedImageId(img._id);
      // else
      //   setSelectedImageId(null);
    }}
    showScale={showScale}
     />
          )
        )}
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