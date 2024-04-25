import React from 'react';
import { Box, SimpleGrid} from '@chakra-ui/react';
import HomeProductCard from './HomeProductCard'; // Assuming CategoryCard component is in the same directory
import { Product } from '../Models/Product';
import { useNavigate } from 'react-router';

interface ProductListProps {
  products: Product[];
}

const HomeProductList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleCardClick = (product: Product) => {
    const productIdJson = encodeURIComponent(JSON.stringify(product.id));
    navigate(`/product/${productIdJson}`);
  }

  return (
    <SimpleGrid mx={100} columns={4} spacing={4}>
      {products.map(product => (
        <Box key={product.id}>
          <HomeProductCard
            imageBase64={product.imageBase64}
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

export default HomeProductList;
