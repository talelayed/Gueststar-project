import "./Cart.css"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import { CartProduct } from "../../components/CartProduct/CartProduct";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
      setTotal(cart.products.reduce((total, item) => total+ parseFloat(item.price) * parseInt(item.quantity), 0));
    }, [cart.products])
    
    
  return (
    <div className="cart-container">
        <h1>Panier</h1>
      <div className="cart-content">
            <div className="cart-products">
            { cart.products.length>0 ?
                cart.products.map((elt) => (
                    <CartProduct id={elt._id} color={elt.color} quantity={elt.quantity}/>
                )) : <h1 style={{margin: "50px auto", color:"red"}}>Panier vide !</h1>
            }
            </div>
        <div className="cart-summary">
            <h2>Détails commande</h2>
            <div className="cart-summary-item">
                <p>Sous-total</p>
                <h3>€ {total}</h3>
            </div>
            <div className="cart-summary-item">
                <p>Promotion</p>
                <h3 style={{color:"red"}}>- € 0</h3>
            </div>
            <div className="cart-summary-item">
                <p>Livraison</p>
                <h3>€ 0</h3>
            </div>
            <hr/>
            <div className="cart-summary-promocode">
                <div className="promocode-item">
                <LocalOfferRoundedIcon sx={{marginTop: "5px", fontSize: 30 }}/>
                <input className="promocode-input" type="text" placeholder="Entrer code promo"/>
                </div>
                <button className="promocode-button">Appliquer</button>
            </div>
            <div className="cart-summary-item">
                <p>Total</p>
                <h3>€ {total}</h3>
            </div>
            <Link to={cart.quantity>0 && "/order"} className="cart-summary-button">
                <button>
                    Commander <ArrowForwardIcon/>
                </button>
            </Link>
        </div>
      </div>
    </div>
  )
}
