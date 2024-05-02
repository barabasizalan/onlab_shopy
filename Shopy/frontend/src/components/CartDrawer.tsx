import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchTotalPriceOfCart } from "../service/apiService";
import { useCart } from "../Contexts/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const handlePlaceOrder = () => {
    onClose();
    navigate('/checkout');
  };

  useEffect(() => {
    fetchPrice();
  }, [cartItems]);

  const fetchPrice = async () => {
    try {
      const response = await fetchTotalPriceOfCart();
      setTotalPrice(response);
    } catch (error) {
      console.error("Error fetching total price:", error);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" size="lg" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader >
          Your Cart
        </DrawerHeader>
        <DrawerBody>
          {cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </DrawerBody>
        <DrawerFooter borderTopWidth='1px' flexDirection='column' alignItems='flex-start'>
          <Text fontSize="lg" fontWeight="bold">
            Total: {totalPrice} €
          </Text>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={handlePlaceOrder}
            width="100%"
          >
            Place Order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
