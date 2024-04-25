import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { CartItem } from "../Models/CartItem";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems }) => {
    return (
        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent >
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody >
          {cartItems.map(item => (
              <Box border="1px solid black" key={item.id}>
                Product id: {item.productId}, quantity: {item.quantity}
                <Button onClick={() => console.log('Remove item from cart')}>Remove</Button>
                </Box>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
}

export default CartDrawer;