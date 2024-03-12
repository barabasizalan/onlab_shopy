import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import ProductList from '../components/ProductList';
import { Product } from '../Models/Product';
import { Welcome } from '../components/Welcome';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://localhost:44367/products/all?limit=8');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
    <Navbar />
    <Welcome />
    <Box p={4}>
      <ProductList products={products} />
    </Box>
    </>
);
};

export default Home;
