import {
  Box,
  Flex,
  IconButton,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { CartItem } from "../../Models/CartItem";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../Models/Product";
import { getProductById } from "../../service/apiService";
import { useCart } from "../../Contexts/CartContext";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { removeFromCart, quantityChange} = useCart();
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  useEffect(() => {
    fetchProduct();
  }, [item.productId, item.quantity]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(item.productId);
      setProduct(response);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleQuantityChange = async (value: number) => {
    try {
      if(value < 1) 
        return;
      if(value > Number(product?.quantity))
      {
        toast({
          title: "Not enough stock!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      await quantityChange(item.id, value);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };
  
  const handleDeleteItem = async () => {
    try {
      await removeFromCart(item.id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Box boxShadow="lg" p={4} mb={4} borderRadius="20px" bg="white" width='100%'>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Image
          src={atob(product?.imageBase64 || "")}
          alt={product?.name || "error"}
          boxSize="60px"
        />
        <Flex alignItems="flex-start" flexDirection="column">
          <Text fontWeight="bold">
            {product?.name || "Error loading the product"}
          </Text>
          <Flex alignItems="center">
            <Text mr={2}>Quantity:</Text>
            <NumberInput
              defaultValue={item.quantity}
              max={10 || Number(product?.quantity)}
              min={1}
              clampValueOnBlur={false}
              width="80px"
            >
              <NumberInputField ref={inputRef}/>
              <NumberInputStepper>
                {item.quantity < (Number(product?.quantity) < 10 ? Number(product?.quantity) : 10)  && (
                <NumberIncrementStepper onClick={() => handleQuantityChange(item.quantity + 1)} />
                )}
                {item.quantity > 1 && (
                <NumberDecrementStepper onClick={() => handleQuantityChange(item.quantity - 1)} />
                )}
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Text fontWeight="bold" mb={2}>
            Total price:
          </Text>
          <Text>{item.quantity * (product?.price || 0)} €</Text>
        </Flex>
        <IconButton
          aria-label="Delete item"
          icon={<AiOutlineDelete />}
          onClick={handleDeleteItem}
          mt={2}
          color="red"
        />
      </Flex>
    </Box>
  );
};

export default CartItemCard;
