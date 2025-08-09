import { useEffect, useState } from "react";
import "./ProductCard.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  }
};

export const ProductCard = () => {
    const discount = true;
    let id = 5;

    const [cardColor, setCardColor] = useState("white")

    useEffect(() => {
        
    }, [cardColor])

  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const cardColors = ["black", "yellow", "white", "red", "blue", "pink", "green", "orange", "purple", ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % cardColors.length);
    }, 2000); // toutes les 2 secondes

    return () => clearInterval(interval); // nettoyage
  }, [cardColors.length]);
    

  return (
    <div className="product-card">
        <div className="product-card-container">
            <Carousel 
            height="100%"
            showDots={true} 
            responsive={responsive} 
            partialVisible={true} 
            slidesToSlide={1}
            arrows={false}
            swipeable
            draggable
            >
            {[1,1].map((index)=>(   
                <div className="image-container">             
                <div className="product-image-color" style={{ backgroundColor: cardColors[currentColorIndex]}}></div>
                <img src="/assets/images/test.png"
                alt="mask"
                className="product-design"
                />   
                <img src="/assets/images/tshirt mask.png"
                alt="mask"
                className="product-mask"
                />
                <img src="/assets/images/tshirt jpeg.jpg" className="product-image" alt="produit"/>
                </div>
             ))}
            </Carousel>
            <div className="promo">-20%</div>
        </div>
        <div className="product-details">
            <div className="nom-produit">T-shirt oversize</div>
            <div className="stars-price">
                <div>
                    <ReactStars
                    classNames="stars"
                        count={5}
                        onChange={()=>{}}
                        size={17}
                        isHalf={true}
                        value={4.8}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>
                <div className="card-price">
                    {
                        discount && <p className="discount">€ 35</p>
                    }
                    <p>€ 24,5</p>
                </div>
            </div>
            <div className="colors-cart">
                    <div className="colors">
                    {
                        cardColors.slice(0, 6).map((color, index) => (
                        <div key={index} className="color" style={{backgroundColor: color}} />
                        ))
                    }
                    {cardColors.length > 5 && <span className="dots">…</span>}
                    </div>
                <div className="cart">
                    <AddShoppingCartIcon variant="contained" sx={{ color: "black" }} />
                </div>
            </div>
        </div>
    </div>
  )
}