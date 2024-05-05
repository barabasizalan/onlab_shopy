import { Image, Flex, Button, HStack, chakra, Menu, MenuButton, MenuList, MenuItem, Divider, Text, Box, useToast, Icon } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import SearchBar from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import '../Components.css';
import { grey } from '@mui/material/colors';
import { useSearchContext } from '../Contexts/SearchContext';
import { useEffect, useState } from 'react';
import { Category } from '../Models/Category';
import CartDrawer from './Cart/CartDrawer';
import { fetchCategoriesAsync } from '../service/apiService';
import { useCart } from '../Contexts/CartContext';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const toast = useToast();
  const { query, setQuery, setSelectedCategory } = useSearchContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const { cartItemsTotalQuantity } = useCart();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const data = await fetchCategoriesAsync();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageClick = () => {
    navigate('/');
  };

  const handleSellClick = () => {
    if (isLoggedIn) {
      window.location.href = '/sell';
    } else {
      toast({
        title: "You need to be logged in to sell products!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  const handleLogout = async () => {
    try {
      const successfulLogout = await logout();

      if (successfulLogout) {
        logout();
        toast({
          title: "Logout successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      } else {
        console.error('Logout failed!');
        toast({
          title: "Logout failed!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        })
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleCartClick = () => {
    if(!isLoggedIn) {
      toast({
        title: "You need to be logged in to view your cart!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } else if(cartItemsTotalQuantity === 0) {
      toast({
        title: "Your cart is empty!",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } else {
      setCartDrawerOpen(true);
    }
  };

  const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const handleCategorySelection = (category: Category) => {
    setSelectedCategory(category);
    setQuery('');
    navigate('/search');
  };

  return (
    <chakra.header id="header">
      <Flex
        w="100%"
        px="10"
        py="5"
        align="center"
        justify="space-between"
        backgroundColor={"#bed1cf"}
      >
        <Box w="6%">
          <Link to="/" onClick={handleImageClick}>
            <Image src="https://seeklogo.com/images/S/shopee-logo-DD5CAE562A-seeklogo.com.png" alt="Shopy" paddingEnd={10} />
          </Link>
        </Box>
        <SearchBar initialQuery={query} />

        <HStack as="nav" spacing="10">
          {!isLoggedIn ? (
            <Button as={Link} to="/login" variant="ghost">Login</Button>
          ) : (
            <Menu >
              <MenuButton as={Button} variant="ghost">My Profile</MenuButton>
              <MenuList className="ProfileDropDown">
                <Text m={3} fontSize="lg" fontWeight="bold">Welcome, username(todo)!</Text>
                <Divider />
                <MenuItem mb={2} mt={2} as={Link} to="/myorders">Orders</MenuItem>
                <MenuItem mb={2} mt={2} as={Link} to="/myproducts">Published products</MenuItem>
                <MenuItem mb={2} mt={2} as={Link} to="/settings">Profile settings</MenuItem>
                <Divider />
                <MenuItem mt={2} onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>

        <HStack paddingStart="10">
          <Button onClick={handleSellClick} variant="ghost">
            Sell
          </Button>
        </HStack>
        <HStack paddingStart="10">
          <Button as="button" onClick={handleCartClick} variant="ghost">
            <Icon as={MdShoppingCart} boxSize={6} />
            {isLoggedIn && cartItemsTotalQuantity > 0 && (
              <Box
                bg="red"
                w="20px"
                h="20px"
                borderRadius="50%"
                position="absolute"
                top="-1px"
                right="-1px"
                color="white"
              >{isLoggedIn && cartItemsTotalQuantity > 0 && <Text>{cartItemsTotalQuantity}</Text>}</Box>
            )}
          </Button>
        </HStack>

      </Flex>
      <Flex
        w="100%"
        px="20"
        align="center"
        justify="left"
        background={grey[300]}
      >
        <Menu >
          <MenuButton pr={10} as={Button} variant="ghost">Categories</MenuButton>
          <MenuList>
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} onClick={() => handleCategorySelection(category)}>{category.name}</MenuItem>
              )
            })}
          </MenuList>
        </Menu>
        <Button pr={10}  variant="ghost">Popular products</Button>
      </Flex>
      <CartDrawer isOpen={cartDrawerOpen} onClose={toggleCartDrawer}/>
    </chakra.header>
  )
}

export default Navbar;
