import { useState } from "react";
import "./CartProduct.css"
import DeleteIcon from '@mui/icons-material/Delete';

export const CartProduct = () => {

    const [number, setNumber] = useState(1); 

	const updateQuantity = (id, value) => {
		[].map((item) => item.id === id) &&
		setNumber((prevState) => (value==-1 && prevState>0) ? prevState + value : value==1 ? prevState + value: prevState);
	};

  return (
    <div className="cart-product">
        <div className="cart-item">
            <div className="cart-item-left">
                <img src="/assets/images/tshirt png.png" className="cart-product-image" alt="produit"/>
                <div className="product-description">
                    <div className="product-details">
                        <h3>T-shirt casablanca</h3>
                        <div className="product-size">
                            <p>Size:</p>
                            <div className="size-chosen">S</div>
                        </div>
                        <div className="product-color">
                            <p>Color:</p>
                            <div className="color-chosen"></div>
                        </div>
                    </div>
                    <div className="product-price">
                        <h3>€ 39</h3>
                    </div>
                </div>
            </div>
            <div className="cart-item-right">
                <DeleteIcon sx={{color: "red", cursor: "pointer"}}/>
                <div className='quantity-counter'>
                    <button onClick={() => updateQuantity(1, -1)}>-</button>
                    <p>{number}</p>
                    <button onClick={() => updateQuantity(1, 1)}>+</button>
                </div>
            </div>
        </div>
      <hr/>
    </div>
  )
}

