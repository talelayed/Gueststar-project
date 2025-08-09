// src/components/ProductSkeleton/ProductSkeleton.jsx
import "./ProductSkeleton.css";

export const ProductSkeleton = () => {
  return (
    <section className="hero">
      <section className="product-section">
        <div className="gallery">
          <div className="img-wrapper">
            <div className="main-img-skeleton skeleton-block" />
            <div className="thumbnails-skeleton">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="thumbnail-skeleton skeleton-block" />
              ))}
            </div>
          </div>
        </div>
        <div className="details-wrapper">
          <div className="skeleton-line title" />
          <div className="skeleton-stars" />
          <div className="skeleton-line price-skeleton" />
          <div className="skeleton-line description" />
          <div className="skeleton-color-options">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="skeleton-color" />
            ))}
          </div>
          <div className="skeleton-sizes">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton-size" />
            ))}
          </div>
          <div className="skeleton-buttons">
            <div className="skeleton-quantity" />
            <div className="skeleton-add-to-cart" />
          </div>
        </div>
      </section>
    </section>
  );
};
