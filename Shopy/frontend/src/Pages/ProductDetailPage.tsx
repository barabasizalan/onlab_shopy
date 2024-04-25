import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../Models/Product";
import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { addToCartAsync, getProductById } from "../service/apiService";

interface ProductDetailPageProps {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const [ product, setProduct] = useState<Product | null>(null);
  const toast = useToast();
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(productId));
        console.log('A termek:' + data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = async () => {
    try {
      await addToCartAsync(product.id, product.quantity);
      toast({
        title: "Product added to cart!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch(error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error adding to cart!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
            <Button colorScheme="blue" size="lg" onClick={addToCart}>
              Add to Cart
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default ProductDetailPage;
