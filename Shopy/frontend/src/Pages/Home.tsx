import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import HomeProductList from '../components/HomeProductList';
import { Product } from '../Models/Product';
import { Welcome } from '../components/Welcome';
import Navbar from '../components/Navbar';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:44367/product/all?page=1&pageSize=8');
      setProducts(response.data.products);
      console.log("!!!!:" + products[0].name + ' ' + products[0].price + ' ' + products[0].description + ' ' + products[0].quantity + ' ' + products[0].categoryId + ' ' + products[0].imageBase64 + ' ' + products[0].id)
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
