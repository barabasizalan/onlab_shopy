import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import HomeProductList from '../components/Home/HomeProductList';
import { Product } from '../Models/Product';
import axios from 'axios';
import API_URLS from '../service/apiConfig';
import Welcome from '../components/Home/Welcome';

axios.defaults.withCredentials = true;

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URLS.getAllProducts("NameAsc", 1, 8));
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
    <Welcome />
    <Box p={4}>
      <HomeProductList products={products} />
    </Box>
    </>
);
};

export default Home;
