import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../Models/Product";
import { Box, Button, Divider, Flex, Image, Select, Text, useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { getProductById } from "../service/apiService";
import { useCart } from "../Contexts/CartContext";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [ product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  
  const toast = useToast();
  const {addToCart} = useCart();
  

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

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    setQuantity(value);
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      toast({
        title: "Product added to cart!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error adding to cart!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Flex align="center" justify="center" height="unset">
        <Box
          maxWidth="1000px"
          width="100%"
          p={4}
          bg="gray.100"
          borderRadius="md"
          boxShadow="md"
        >
          <Flex>
            <Box flex="1">
              <Image src={atob(product.imageBase64)} alt={product.name} />
            </Box>
            <Divider orientation="vertical" colorScheme="blue" m={5}/>
            <Flex direction="column" flex="2" ml={4} justifyContent="center">
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                {product.name}
              </Text>
              <Text fontSize="lg" mb={4} maxHeight="15rem" overflowY="auto">
                {product.description}
              </Text>
              <Flex align="center" mb={4}>
                <Text fontSize="lg" mr={2}>
                  Quantity:
                </Text>
                <Select value={quantity.toString()} onChange={handleQuantityChange}>
                  {Array.from({ length: product.quantity <= 10 ? product.quantity : 10 }, (_, i) => i + 1).map(
                    (value) => (
                      <option key={value} value={value.toString()}>
                        {value}
                      </option>
                    )
                  )}
                </Select>
              </Flex>
            </Flex>
            <Divider orientation="vertical" colorScheme="blue" m={5}/>
            <Flex direction="column" flex="1" ml={4} justifyContent="center">
              <Text fontSize="lg" mb={4}>
                {product.price} €
              </Text>
              <Button colorScheme="blue" size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default ProductDetailPage;
