// CartProductSkeleton.jsx
 // à créer pour style spécifique si nécessaire
import Skeleton from "@mui/material/Skeleton";

export const CartProductSkeleton = () => {
  return (
    <div className="cart-product">
      <div className="cart-item">
        <div className="cart-item-left">
          <div className="image-container">
            <Skeleton variant="rectangular" width={80} height={80} />
          </div>
          <div className="product-description">
            <div className="product-details">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="50%" />
            </div>
            <div className="product-price">
              <Skeleton variant="text" width={80} />
            </div>
          </div>
        </div>
        <div className="cart-item-right">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="rectangular" width={80} height={30} />
        </div>
      </div>
      <hr />
    </div>
  );
};
