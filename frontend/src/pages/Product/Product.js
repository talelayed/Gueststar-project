import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { publicRequest } from '../../RequestMethods';
import {ProductImages} from '../../components/ProductImages/ProductImages';
import {ProductDescription} from '../../components/ProductDescription/ProductDescription';
// import ProductsCarousel from '../../components/ProductsCarousel/ProductsCarousel';
// import ProductImagesSkeleton from '../../components/ProductImagesSkeleton/ProductImagesSkeleton';
// import ProductDescriptionSkeleton from '../../components/ProductDescriptionSkeleton/ProductDescriptionSkeleton';
import './Product.css'; // import the new CSS file

export const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

//   const getProduct = async () => {
//     try {
//       const { data } = await publicRequest.get(`/products/product/${id}`);
//       setProduct(data.product);
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProduct();
//   }, [id]);
// setProduct({
//     price: "30"
// })

  const [cartCount, setCartCount] = useState(0);

  return (

    //   loading ? (
    //     <section className="product-section">
    //       {/* <ProductImagesSkeleton />
    //       <ProductDescriptionSkeleton /> */}
    //     </section>
    //   ) : (
        // product && (
        <section className="hero">
            <section className="product-section">
                <ProductImages />
                <ProductDescription setCartCount={setCartCount} />
            </section>
        </section>
        // )
    //   )

  );
}

