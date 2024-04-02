import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../Models/Product";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

interface ProductDetailPageProps {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);

  

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productJson = searchParams.get("product");
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
    <>
      <Navbar />
      <Flex align="center" justify="center" height="unset">
        <Flex maxWidth="800px" width="100%" p={4}>
          <Box flex="1">
            <Image
              src={atob(product.imageBase64)}
              alt={product.name}
            />
          </Box>
          <Box flex="2" ml={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              {product.name}
            </Text>
            <Text fontSize="lg" mb={2}>
              {product.price} €
            </Text>
            <Text fontSize="lg" mb={2}>
              Available Quantity: {product.quantity}
            </Text>
            <Text fontSize="lg" mb={4}>
              Description: {product.description}
            </Text>
            <Button colorScheme="blue" size="lg">
              Add to Cart
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default ProductDetailPage;
