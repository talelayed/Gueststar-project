import "./ProductCardSkeleton.css"

export const ProductCardSkeleton = () => {
  return (
    <div className="product-card skeleton">
      <div className="product-card-container">
        <div className="image-container">
          <div className="skeleton-color"></div>
          <div className="skeleton-image"></div>
          <div className="skeleton-image"></div>
          <div className="skeleton-image"></div>
        </div>
        <div className="promo-skeleton shimmer"></div>
      </div>
      <div className="product-details">
        <div className="nom-produit skeleton-text shimmer"></div>
        <div className="stars-price">
          <div className="skeleton-stars shimmer"></div>
          <div className="card-price">
            <div className="skeleton-price shimmer"></div>
          </div>
        </div>
        <div className="colors-cart">
          <div className="colors">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-color-circle shimmer"></div>
            ))}
          </div>
          <div className="cart skeleton-cart shimmer"></div>
        </div>
      </div>
    </div>
  );
};
