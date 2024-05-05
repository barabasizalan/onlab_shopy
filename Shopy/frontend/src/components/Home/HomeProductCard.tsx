import { Box, Flex, Image, Text, chakra, useToast } from '@chakra-ui/react';
import { useCart } from '../../Contexts/CartContext';
import { Product } from '../../Models/Product';

interface CardProps {
  product: Product
  onClick?: () => void;
  margin: number;
}

const HomeProductCard: React.FC<CardProps> = ({ product, onClick, margin: mx }) => {

  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = async () => {
    try {
      if(product.quantity > 1) {
        await addToCart(product.id, 1);
        toast({
          title: "Product added to cart!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error adding to cart!",
          description: "Product is out of stock!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      cursor="pointer"
      mx={mx}
      height="300px"
      width="300px"
      display="flex"
      flexDirection="column"
    >
      <Box m="6" height="70%" borderRadius="lg" overflow="hidden" display="flex" justifyContent="center" alignItems="center" onClick={onClick}> 
        <Image src={atob(product.imageBase64)} alt={product.name} objectFit="scale-down" objectPosition="center" height="100%" width="100%" />
      </Box>
      <Box p="6" height="30%">
        <Text color="gray.500" fontWeight="semibold" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {product.name}
        </Text>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          roundedBottom="lg">
          <chakra.h1 color="black" fontWeight="semibold" fontSize="lg">
            {product.price} €
          </chakra.h1>
          <chakra.button
            px={2}
            py={1}
            bg="black"
            fontSize="xs"
            color="white"
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: "gray.700",
            }}
            onClick={() => handleAddToCart()}
            >
              Add to cart
            </chakra.button>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomeProductCard;