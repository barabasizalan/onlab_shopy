import React from 'react';
import { Box, SimpleGrid} from '@chakra-ui/react';
import ProductCard from './ProductCard'; // Assuming CategoryCard component is in the same directory
import { Product } from '../Models/Product';
import { useNavigate } from 'react-router';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleCardClick = (product: Product) => {
    const productJson = encodeURIComponent(JSON.stringify(product));
    navigate(`/product/${product.id}?product=${productJson}`);
  }

  return (
    <SimpleGrid mx={100} columns={4} spacing={4}>
      {products.map(product => (
        <Box key={product.id}>
          <ProductCard
            imageData={product.imageData}
            name={product.name}
            price={product.price}
            onClick={() => handleCardClick(product)}
            margin={2}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
