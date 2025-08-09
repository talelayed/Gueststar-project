import { useEffect, useState } from "react";
import "./CartProduct.css"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeProduct } from "../../Redux/slices/CartSlice";
import { CartProductSkeleton } from "../CartProductSkeleton/CartProductSkeleton";
import { publicRequest } from "../../RequestMethods";

export const CartProduct = ({id, color, quantity}) => {
    const [loading, setLoading] = useState(false)
    const [design, setDesign] = useState({})
    const [qte, setQte] = useState(quantity)
    
  useEffect(() => {  
    const fetchDesign = async () => {
      try {
        const res = await publicRequest.get(`designs/${id}`);
        setDesign(res.data);
        
        // Object.entries(res.data.product.colorsAndSizes).map(([colorName, sizes], index) =>console.log(colorName,sizes))
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);
        setLoading(false);
      }
    };
    fetchDesign();
  }, []);

    const [products, setProducts] = useState([]);

    useEffect(() => {
    const fetchProducts = async () => {
        try {
        const res = await publicRequest.get("/products");
        
        setProducts(res.data);
        
        
        setLoading(false);
        } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setLoading(false);
        }
    };

    fetchProducts();  
    }, []);

    const [number, setNumber] = useState(quantity); 

	const updateQuantity = (id, value) => {
		[].map((item) => item.id === id) &&
		setNumber((prevState) => (value==-1 && prevState>0) ? prevState + value : value==1 ? prevState + value: prevState);
	};

    const dispatch = useDispatch();

    const handleRemove = ({ id, price, qte }) => {
        dispatch(removeProduct({ id, price, qte }));
    };

    useEffect(() => {
      
    }, [qte])
    
    if (loading || !design.design || products.length === 0) {
    return <CartProductSkeleton />;
    }
  return (
    <div className="cart-product">
        <div className="cart-item">
            <div className="cart-item-left">
                    <div className="image-container">             
                    <div className="product-image-color" style={{ backgroundColor:  color}}></div>
                    <img src={design.design?.imgs[0].back}
                    alt="design"
                    className="product-design"
                    />   
                    <img src={products.products?.find(elt => elt._id === design.design?.linkedProduct).imgs[0].mask}
                    alt="mask"
                    className="product-mask"
                    />
                    <img src={products.products?.find(elt => elt._id === design.design?.linkedProduct).imgs[0].img} className="product-image" alt="produit"/>
                    </div>
                <div className="product-description">
                    <div className="product-details">
                        <h3>{design.design?.title}</h3>
                        <div className="product-size">
                            <p>Size:</p>
                            <div className="chosen-sizes">
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
                                    <div className="chosen-size">
                                        {size}
                                    </div>
                                    </div>
                                ));
                                })()}
                            </div>
                        </div>
                        <div className="product-color">
                            <p>Color:</p>
                            <div className="color-chosen" style={{backgroundColor: color}}></div>
                        </div>
                    </div>
                    <div className="product-price">
                        <h3>€ {design.design?.price}</h3>
                    </div>
                </div>
            </div>
            <div className="cart-item-right">
                <DeleteIcon onClick={()=>handleRemove({id: id, price: design.design.price, qte: quantity})} sx={{color: "red", cursor: "pointer"}}/>
                <div className='quantity-counter'>
                    <button 
                        onClick={() =>
                            {
                            if (qte>1){
                            setQte(qte-1);
                            dispatch(decreaseQuantity({ _id: id}))}
                            }
                        }
                    >-</button>
                    <p>{qte}</p>
                    <button 
                        onClick={() =>
                            {
                            setQte(qte+1);
                            dispatch(increaseQuantity({ _id: id}))
                            }
                        }
                    >+</button>
                </div>
            </div>
        </div>
      <hr/>
    </div>
  )
}

