import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../Models/Product';

interface ProductDetailPageProps {
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productJson = searchParams.get('product');
    if (productJson) {
      const decodedProductJson = decodeURIComponent(productJson);
      const parsedProduct = JSON.parse(decodedProductJson);
      setProduct(parsedProduct);
    }
  }, [location.search]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price} HUF</p>
    </div>
  );
};

export default ProductDetailPage;
