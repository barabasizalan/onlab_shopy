import { Box, Image, Text, chakra, useToast } from '@chakra-ui/react';
import { useCart } from '../../Contexts/CartContext';
import { Product } from '../../Models/Product';
import { useAuth } from '../../Contexts/AuthContext';

interface CardProps {
  product: Product
  onClick?: () => void;
  margin: number;
}

const HomeProductCard: React.FC<CardProps> = ({ product, onClick, margin: mx }) => {

  const {isLoggedIn} = useAuth();
  const { addToCart, selectedCart } = useCart();
  const toast = useToast();

  const handleAddToCart = async () => {
    if(!isLoggedIn) {
      toast({
        title: "You need to be logged in to add products to cart!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      if(product.quantity >= 1) {
        const addToCartDto = {
          productId: product.id,
          quantity: 1,
          cartId: selectedCart?.id ?? 0,
        };
        await addToCart(addToCartDto);
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
        <chakra.h1 color="black" fontWeight="semibold" fontSize="lg">
          {product.price} €
        </chakra.h1>
      </Box>
      <chakra.button
            bg="grey"
            color="white"
            textTransform="uppercase"
            _hover={{ bg: "gray.700" }}
            onClick={handleAddToCart}
            width="100%" // Button width spans the whole card
            py="2"
            cursor="pointer"
          >
            Add to cart
          </chakra.button>
    </Box>
  );
};

export default HomeProductCard;