export const StackedImage = ({ color, design, products, style = {}, onClick }) => {
  const productData = products?.products?.find(p => p._id === design.linkedProduct);
  if (!productData) return null;
  
  

  return (
    <div className="image-container" style={style} onClick={onClick}>
      <div
        className="product-image-color"
        style={{ backgroundColor: color }}
      />
      <img src={design.imgs[0].back} alt="design" className="product-design" />
      <img src={productData.imgs[1].mask} alt="mask" className="product-mask" />
      <img src={productData.imgs[1].img} alt="produit" className="product-image" />
    </div>
  );
};
