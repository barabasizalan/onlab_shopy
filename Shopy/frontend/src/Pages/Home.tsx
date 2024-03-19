import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import ProductList from '../components/ProductList';
import { Product } from '../Models/Product';
import { Welcome } from '../components/Welcome';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:44367/product/all?limit=8', {withCredentials: true});
      setProducts(response.data);
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
