import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { CartItem } from "../Models/CartItem";
import CartItemCard from "./CartItemCard";

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
        size="lg"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent >
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody >
          {/* {cartItems.map(item => (
              <Box border="1px solid black" key={item.id}>
                Product id: {item.productId}, quantity: {item.quantity}
                <Button onClick={() => console.log('Remove item from cart')}>Remove</Button>
                </Box>
            ))} */}
            {cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
}

export default CartDrawer;