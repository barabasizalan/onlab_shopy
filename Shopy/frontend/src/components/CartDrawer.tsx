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
import { CartItem } from "../Models/CartItem";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
}) => {
  
  const totalValue = 100.1;
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    onClose();
    navigate('/checkout');
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
            Total: {totalValue} €
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
