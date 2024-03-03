import React from 'react';
import { Box, SimpleGrid} from '@chakra-ui/react';
import CategoryCard from './CategoryCard'; // Assuming CategoryCard component is in the same directory
import { Product } from '../Models/Product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <SimpleGrid mx={100} columns={4} spacing={4}>
      {products.map(product => (
        <Box key={product.id}>
          <CategoryCard
            imageUrl={product.imageUrl}
            name={product.name}
            description={product.description}
            onClick={() => {console.log(product.name)}}
            margin={2}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
