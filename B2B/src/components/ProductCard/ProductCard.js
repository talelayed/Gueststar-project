import { useEffect, useState } from "react";
import "./ProductCard.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import axios from "axios";
import { StackedImage } from "../StackedImage/StackedImage";
import { ProductCardSkeleton } from "./ProductCardSkeleton/ProductCardSkeleton";
import { publicRequest } from "../../RequestMethods";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  }
};

export const ProductCard = (design) => {
    const [cardColor, setCardColor] = useState("white")

    useEffect(() => {
        
    }, [cardColor])

  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const [products, setProducts] = useState([]);
  const [cardColors, setCardColors] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % cardColors.length);
    }, 2000); // toutes les 2 secondes

    return () => clearInterval(interval); // nettoyage
  }, [cardColors.length]);

  const [loading, setLoading] = useState(true);

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


  useEffect(() => {
    
    setCardColors(Object.entries(products.products?.find(elt => elt._id === design.linkedProduct)?.colorsAndSizes || {}).map(([color]) => color))
        
  }, [design.linkedProduct, products.products])
    
    if (loading) {
      return <ProductCardSkeleton />;
    }

  return (


    <Link className="product-card" to={`/products/${design._id}`} >
        <div className="product-card-container">
            {/* <Carousel 
            height="100%"
            showDots={true} 
            responsive={responsive} 
            partialVisible={true} 
            slidesToSlide={1}
            arrows={false}
            swipeable
            draggable
            > */}
            {/* {[1,1].map((index)=>(    */}

                    {/* <StackedImage color={cardColors[currentColorIndex]} products={products} design={design}/> */}
                    <div className="image-container">             
                    <div className="product-image-color" style={{ backgroundColor:  cardColors[currentColorIndex]}}></div>
                    <img src={design.imgs[0].front}
                    alt="design"
                    className="product-design"
                    />   
                    <img src={products.products?.find(elt => elt._id === design.linkedProduct).imgs[0].mask}
                    alt="mask"
                    className="product-mask"
                    />
                    <img src={products.products?.find(elt => elt._id === design.linkedProduct).imgs[0].img} className="product-image" alt="produit"/>
                    </div>

             {/* ))} */}
            {/* </Carousel> */}
            {parseInt(design.discount)>0 && <div className="promo">-{design.discount}%</div>}
        </div>
        <div className="product-details">
            <div className="nom-produit">{design.title}</div>
            <div className="stars-price">
                <div>
                    <ReactStars
                    classNames="stars"
                        count={5}
                        onChange={()=>{}}
                        size={17}
                        isHalf={true}
                        value={5}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>
                <div className="card-price">
                    {
                        design.discount && <p className="discount">€ {design.price}</p>
                    }
                    <p>€ {design.price - design.discount}</p>
                </div>
            </div>
            <div className="colors-cart">
            <div className="colors">
            {products.products && Object.entries(
              products.products?.find(elt => elt._id === design.linkedProduct)?.colorsAndSizes || {}
            ).slice(0, 6).map(([color]) => (
              <div
                key={color}
                className="color"
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginRight: "5px"
                }}
              />
            ))}
                    {cardColors.length > 5 && <span className="dots">…</span>}
                    </div>
                <div className="cart">
                    <AddShoppingCartIcon variant="contained" sx={{ color: "black" }} />
                </div>
            </div>
        </div>
    </Link>
  )
}