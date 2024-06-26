import {
  Button,
  Card,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
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
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useCart } from "../../Contexts/CartContext";
import {
  AddIcon,
  ChevronDownIcon,
  HamburgerIcon,
  LinkIcon,
} from "@chakra-ui/icons";
import { CartItem } from "../../Models/CartItem";
import { BiTrash, BiUser } from "react-icons/bi";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [isJoinCartModalOpen, setIsJoinCartModalOpen] =
    useState<boolean>(false);
  const [cartCode, setCartCode] = useState<string>("");

  const [isCreatingCartModalOpen, setIsCreatingCartModalOpen] =
    useState<boolean>(false);
  const [cartName, setCartName] = useState<string>("");

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isMembersModalOpen, setIsMembersModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const toast = useToast();

  const {
    allCarts,
    createNewCart,
    joinCart,
    selectedCart,
    setSelectedCart,
    totalPrice,
    cartMembers,
    deleteCartMember,
  } = useCart();

  const handlePlaceOrder = () => {
    onClose();
    navigate("/checkout");
  };

  useEffect(() => {
    setCartItems(selectedCart?.cartItems ?? []);
  }, [selectedCart]);

  const handleJoinCartClick = async (code: string) => {
    try {
      await joinCart(code);
      setCartCode("");
      setIsJoinCartModalOpen(false);
    } catch (error) {
      console.error("Error joining cart:", error);
    }
  };

  const handleCreateNewCart = async (name: string) => {
    try {
      createNewCart(name);
      setCartName("");
      setIsCreatingCartModalOpen(false);
    } catch (error) {
      console.error("Error creating new cart:", error);
    }
  };

  const handleDeleteMember = async (username: string) => {
    try {
      await deleteCartMember(username);
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: 'Copied to clipboard',
          description: `Code "${text}" has been copied to your clipboard.`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: 'Failed to copy',
          description: 'An error occurred while copying to clipboard.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <Drawer isOpen={isOpen} placement="right" size="lg" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton mt={3} />
        <DrawerHeader>
          <HStack spacing={8}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label={"Cart actions"}
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <Text m={3}>Cart actions</Text>
                <Divider mb={2} />
                <MenuItem
                  icon={<AddIcon />}
                  onClick={() => setIsCreatingCartModalOpen(true)}
                >
                  New Cart
                </MenuItem>
                <MenuItem
                  icon={<LinkIcon />}
                  onClick={() => setIsJoinCartModalOpen(true)}
                >
                  Join Cart
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Select Cart
              </MenuButton>
              <MenuList>
                {allCarts.map((cart) => (
                  <MenuItem key={cart.id} onClick={() => setSelectedCart(cart)}>
                    <Text>{cart.name}</Text>
                    {cart?.isOwner ? (
                      <Tag ml="auto" colorScheme="blue">
                        Owner
                      </Tag>
                    ) : (
                      <Tag ml="auto" colorScheme="yellow">
                        Member
                      </Tag>
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {selectedCart?.isOwner && (
              <IconButton
                aria-label="Cart-members"
                icon={<BiUser />}
                variant="outline"
                onClick={() => setIsMembersModalOpen(true)}
              />
            )}
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody>
          {selectedCart?.name ? (
            <>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="xl">
                  Selected cart: {selectedCart.name}
                </Text>
                <Text fontSize="lg" onClick={() => copyToClipboard(selectedCart.code)} cursor='pointer'>
                  Code: <b>{selectedCart.code}</b>
                </Text>
              </Flex>
              <Divider my={4} />
              {cartItems.length !== 0 ? (
                cartItems.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))
              ) : (
                <Center>
                  <Text fontWeight="bold" fontSize="xl">
                    This cart is empty!
                  </Text>
                </Center>
              )}
            </>
          ) : (
            <Text fontWeight="bold" fontSize="xl">
              Create or join a cart to get started!
            </Text>
          )}
        </DrawerBody>
        <DrawerFooter
          borderTopWidth="1px"
          flexDirection="column"
          alignItems="flex-start"
        >
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
      <Modal
        isOpen={isJoinCartModalOpen}
        onClose={() => setIsJoinCartModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Cart Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter code"
              value={cartCode}
              onChange={(e) => setCartCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr="auto"
              onClick={() => handleJoinCartClick(cartCode)}
            >
              Join
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsJoinCartModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isCreatingCartModalOpen}
        onClose={() => setIsCreatingCartModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Name your cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter name"
              value={cartName}
              onChange={(e) => setCartName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr="auto"
              onClick={() => handleCreateNewCart(cartName)}
            >
              Create
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsCreatingCartModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cart Members</ModalHeader>
          <ModalBody>
            {cartMembers.length > 0 ? (
              cartMembers.map((member) => (
                <Card key={member} mb={2} p={2} background="#faf9f7">
                  <Flex alignItems="center">
                    <Text fontWeight="bold">{member}</Text>
                    <IconButton
                      aria-label="Remove member"
                      icon={<BiTrash />}
                      colorScheme="red"
                      size="sm"
                      ml="auto"
                      onClick={() => handleDeleteMember(member)}
                    />
                  </Flex>
                </Card>
              ))
            ) : (
              <Text>No members in this cart</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => setIsMembersModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Drawer>
  );
};

export default CartDrawer;
