import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import CartItemCard from './CartItemCard';
import { useNavigate } from 'react-router';
import {  useEffect, useState } from 'react';
import { fetchTotalPriceOfCart } from '../../service/apiService';
import { useCart } from '../../Contexts/CartContext';
import { AddIcon, HamburgerIcon, LinkIcon } from '@chakra-ui/icons';
import { Cart } from '../../Models/Cart';
import { CartItem } from '../../Models/CartItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isJoinCartModalOpen, setIsJoinCartModalOpen] = useState<boolean>(false);
  const [cartCode, setCartCode] = useState<string>('');
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const navigate = useNavigate();
  const { allCarts, createNewCart, joinCart } =useCart();

  const handlePlaceOrder = () => {
    onClose();
    navigate('/checkout');
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  useEffect(() => {
    if (allCarts.length > 0) {
      setSelectedCart(allCarts[0]);
    }
  }, [allCarts]);

  useEffect(() => {
    setCartItems(selectedCart?.cartItems ?? []);
  }, [selectedCart]);

  const fetchPrice = async () => {
    try {
      const response = await fetchTotalPriceOfCart();
      setTotalPrice(response);
    } catch (error) {
      console.error('Error fetching total price:', error);
    }
  };

  const handleNewCartClick = async () => {
    try {
      createNewCart();
    } catch (error) {
      console.error('Error creating new cart:', error);
    }
  };

  const handleJoinCartClick = async (code: string) => {
    try {
      joinCart(code);
      setCartCode('');
      setIsJoinCartModalOpen(false);
    } catch (error) {
      console.error('Error joining cart:', error);
    }
  };

  const handleCartSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCartId = parseInt(e.target.value);
    const cart = allCarts.find((cart) => cart.id === selectedCartId) ?? null;
    setSelectedCart(cart);
  };

  return (
    <Drawer isOpen={isOpen} placement='right' size='lg' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
      <DrawerCloseButton mt={3}/>
        <DrawerHeader >
          <HStack spacing={4}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Cart actions'
                icon={<HamburgerIcon />}
                variant='outline'
                mr={8}
              />
              <MenuList>
                <MenuItem icon={<AddIcon />} onClick={() => handleNewCartClick()}>
                  New Cart
                </MenuItem>
                <MenuItem icon={<LinkIcon />} onClick={() => setIsJoinCartModalOpen(true)}>
                  Join Cart
                </MenuItem>
              </MenuList>
            </Menu>
            <Select mr={10} value={selectedCart?.id} onChange={handleCartSelectChange}>
              {allCarts.map((cart) => (
                <option key={cart.id} value={cart.id}>
                  {cart.code}
                </option>
              ))}
            </Select>
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody>
          {
            cartItems.length !== 0 ? (
            cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))) : (
            <Text textAlign='center' fontSize='lg' fontWeight='bold' mt={10}>
              The cart is empty
            </Text>
          )}

        </DrawerBody>
        <DrawerFooter borderTopWidth='1px' flexDirection='column' alignItems='flex-start'>
          <Text fontSize='lg' fontWeight='bold'>
            Total: {totalPrice} €
          </Text>
          <Button
            colorScheme='blue'
            variant='solid'
            onClick={handlePlaceOrder}
            width='100%'
          >
            Place Order
          </Button>
        </DrawerFooter>
      </DrawerContent>
      <Modal isOpen={isJoinCartModalOpen} onClose={() => setIsJoinCartModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Cart Code</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder='Enter code' value={cartCode} onChange={(e) => setCartCode(e.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr='auto' onClick={() => handleJoinCartClick(cartCode)}>
                Join
              </Button>
              <Button variant='ghost' onClick={() => setIsJoinCartModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </Drawer>
  );
};

export default CartDrawer;
