import { useState } from "react";
import "./ProductDescription.css"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReactStars from "react-stars";

export const ProductDescription = (props) => {
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

  //   PUSHES ITEMS TO CART/BASKET
  const handleAddToCart = (e) => {
    e.preventDefault();
    props.setCartCount(count);
    setCount(0);
  };

  return (
    <div className="details-wrapper">
      <p className="details-company">Category</p>
      <h1 className="details-product-name">T-shirt Casablanca</h1>
                <div>
                    <ReactStars
                    classNames="stars"
                        count={5}
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
          € 125
        </h2>
        <h2 className="price-old">€ 250</h2>
        <div className="product-promo">50%</div>
      </div>
      <p className="details-description">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer.
      </p>
      <hr/>
      <p>Choisir Couleur:</p>
                <div className="choose-colors">
                    {
                        [1,1,1,1,1,1,1,1,1].map(()=>(
                            <div className="choose-color"></div>
                        ))
                    }
                </div>
      <hr/>
      <p>Choisir Taille:</p>
                <div className="choose-sizes">
                    {
                        [1,1,1,1,1,1].map(()=>(
                            <div className="choose-size">S</div>
                        ))
                    }
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
        <button className="add-to-cart" onClick={handleAddToCart}>
          <ShoppingCartIcon/>
          Add to cart
        </button>
      </div>
    </div>
  );
};
