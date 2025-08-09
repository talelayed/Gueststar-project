import "./Cart.css"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import { CartProduct } from "../../components/CartProduct/CartProduct";

export const Cart = () => {
  return (
    <div className="cart-container">
        <h1>Panier</h1>
      <div className="cart-content">
            <div className="cart-products">
            {
                [1,1,1,1,1,1].map(() => (
                    <CartProduct/>
                ))
            }
            </div>
        <div className="cart-summary">
            <h2>Détails commande</h2>
            <div className="cart-summary-item">
                <p>Sous-total</p>
                <h3>€ 100</h3>
            </div>
            <div className="cart-summary-item">
                <p>Promotion</p>
                <h3 style={{color:"red"}}>- € 100</h3>
            </div>
            <div className="cart-summary-item">
                <p>Livraison</p>
                <h3>€ 100</h3>
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
                <h3>€ 100</h3>
            </div>
            <div className="cart-summary-button">
                <button>
                    Commander <ArrowForwardIcon/>
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}
