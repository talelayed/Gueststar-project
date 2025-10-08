import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';
import ReactStars from "react-stars";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { addProduct } from '../../Redux/slices/CartSlice';
import { ProductSkeleton } from '../../components/ProductSkeleton/ProductSkeleton';
import { publicRequest } from '../../RequestMethods';

const StackedImage = ({ color, design, productData, style = {}, onClick, side, type }) => {
  
  if (!productData || !design?.imgs[0]) return null;
  
  if (type === "main") {return (
    <div className="main-image-container" style={style} onClick={onClick}>
      <div
        className="main-product-image-color"
        style={{ backgroundColor: color }}
      />
      <img
        src={design?.imgs[0]?.[side]}
        alt="design"
        className="main-product-design"
      />
      <img
        src={productData.imgs[0].mask}
        alt="mask"
        className="main-product-mask"
      />
      <img
        src={productData.imgs[0].img}
        alt="produit"
        className="main-product-image"
      />
    </div>
  );}

 if (type === "sides") return (
    <div className="main-image-container" style={style} onClick={onClick}>
      <div
        className="main-product-image-color"
        style={{ backgroundColor: color }}
      />
      <img
        src={design?.imgs[0]?.[productData?.type]}
        alt="design"
        className="main-product-design"
      />
      <img
        src={productData.mask}
        alt="mask"
        className="main-product-mask"
      />
      <img
        src={productData.img}
        alt="produit"
        className="main-product-image"
      />
    </div>
  );
};

export const Product = () => {
  const [design, setDesign] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {  
    const fetchDesign = async () => {
      try {
        const res = await publicRequest.get(`designs/${id}`);
        setDesign(res.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);
        setLoading(false);
      }
    };
    fetchDesign();
  }, []);

  const [cartCount, setCartCount] = useState(0);

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(products.products?Object.keys((products.products?.find(elt => elt._id === design.design?.linkedProduct))?.colorsAndSizes)[0] : "white")
  const [selectedSide, setSelectedSide] = useState("front")
  const navigate = useNavigate();

  useEffect(() => {
    if (products.products)
    setSelectedColor(Object.keys((products.products?.find(elt => elt._id === design.design?.linkedProduct))?.colorsAndSizes)[0])

  }, [products])
  

  // Récupération des produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get("products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Récupération du produit lié au design
  const productData = products?.products?.find(
    (p) => p._id === design.design?.linkedProduct
  );

  // Extraction des couleurs disponibles
  const cardColors = productData
    ? Object.keys(productData.colorsAndSizes || {})
    : [];

  let [count, setCount] = useState(1);

  //   ADDS NUMBER OF ITEMS TO CART (PLUS 1)
  const handleAdd = () => {
    return setCount((prevCount) => prevCount + 1);
  };

  //   SUBTRACTS NUMBER FROM TOTAL TO BE ADDED TO CART (MINUS 1)
  const handleSubstract = () => {
    setCount((prevCount) => {
      if (count > 1) {
        return prevCount - 1;
      } else {
        return setCount(1);
      }
    });
  };

  //   HANDLES NUMBER INPUT
  const handleInputChange = (e) => {
    setCount(e.target.value);
  };

    useEffect(() => {
    const fetchProducts = async () => {
        try {
        const res = await publicRequest.get("products");
        
        setProducts(res.data);
        
        
        setLoading(false);
        } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setLoading(false);
        }
    };

    fetchProducts();  
    }, []);


    const dispatch = useDispatch()

      const addToCart = async (product) => {
      dispatch(
      addProduct({
        _id: id,
        quantity: count,
        color: selectedColor,
        price: design.design?.price
      })
    );
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
    setCount(0);
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

    if (loading || !design.design || products.length === 0) {
    return <ProductSkeleton />;
    }
    

  return (

    //   loading ? (
    //     <section className="product-section">
    //       {/* <ProductImagesSkeleton />
    //       <ProductDescriptionSkeleton /> */}
    //     </section>
    //   ) : (
        // product && (
        <section className="hero">
            <section className="product-section">
            <div className="gallery">
              <div className="img-wrapper">
                <div className="main-img">
                  <StackedImage
                    color={selectedColor}
                    design={design.design}
                    productData={productData}
                    onClick={() => setOpen(true)}
                    side={selectedSide}
                    type = "main"
                  />
                </div>

                <div className="thumbnails">
                  {productData?.imgs.map((productSide, index) => (
                    <StackedImage
                      key={index}
                      color={selectedColor}
                      design={design.design}
                      productData={productSide}
                      style={{
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                        border:
                        index === mainImageIndex ? "2px solid black" : "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                      onClick={() => {
                        setMainImageIndex(index);
                        setImageIndex(index);
                        setSelectedSide(productSide.type)
                        
                      }}
                      side = {selectedSide}
                      type = "sides"
                    />
                  ))}
                </div>
              </div>
            </div>
                {/* <ProductDescription selectedColor={selectedColor} {...design} setCartCount={setCartCount} /> */}

    <div className="details-wrapper">
      <p>Choisir Couleur:</p>
                <div className="choose-colors">
            {products.products && Object.entries(
              products.products?.find(elt => elt._id === design.design?.linkedProduct)?.colorsAndSizes || {}
            ).map(([color]) => (
              <div
                key={color}
                className="choose-color"
                style={{
                  backgroundColor: color,
                  cursor: "pointer",
                  border: color === selectedColor ? "2px solid gray" : "1px solid #ccc",
                }}
                onClick={()=>setSelectedColor(color)}
              />
            ))}
                </div>
      <hr/>
      <p className="details-company">
        {products.products?.find(elt => elt._id === design.design?.linkedProduct)?.category}
      </p>
      <h1 className="details-product-name">{design.design?.title}</h1>
                <div>
                    <ReactStars
                    classNames="stars"
                        count={5}
                        value={5}
                        onChange={()=>{}}
                        size={25}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>
      <div className="price">
        <h2 className="price-new">
          € {design.design?.price - design.design?.discount*design.design?.price/100}
        </h2>
        <h2 className="price-old">€ {design.design?.price}</h2>
        <div className="product-promo">-{design.design?.discount}%</div>
      </div>
      <p className="details-description">
        {design.design?.description}
      </p>
      <hr/>
      <p>Contenu d'un pack:</p>
      <div className="choose-sizes">
        {products.products && (() => {
          const product = products.products.find(elt => elt._id === design.design?.linkedProduct);
          const allSizes = Array.from(
            new Set(
              Object.values(product?.colorsAndSizes || {}).flatMap(sizesObj => Object.keys(sizesObj))
            )
          );

          return allSizes.map((size, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              {product?.pack?.[index] ?? 0}*
              <div className="choose-size">
                {size}
              </div>
            </div>
          ));
        })()}
      </div>


          <div className="buy">
            <div className="quantity-btns">
              <button className="minus-btn" onClick={handleSubstract}>
                <RemoveRoundedIcon/>
              </button>
              <input
                type="number"
                name="number"
                value={count}
                id="number"
                onChange={handleInputChange}
                min="1"
              />
              <button className="plus-btn" onClick={handleAdd}>
                <AddRoundedIcon/>
              </button>
            </div>
            <button className="add-to-cart" onClick={()=>addToCart()}>
              <ShoppingCartIcon/>
              Add to cart
            </button>
          </div>
        </div>
            </section>
            <ToastContainer position="top-right"/>
        </section>
        // )
    //   )

  );
}

