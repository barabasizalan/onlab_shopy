import { Image, Flex, Button, HStack, chakra, Menu, MenuButton, MenuList, MenuItem, Divider, Text, Box, useToast, Icon } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md'; // Import cart icon from react-icons/md
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import '../Components.css';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useSearchContext } from '../Contexts/SearchContext';
import { useEffect, useState } from 'react';
import { Category } from '../Models/Category';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const toast = useToast();
  const { query } = useSearchContext();
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('https://localhost:44367/category/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageClick = () => {
    window.location.href = '/';
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
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://localhost:44367/logout');

      if (response.status === 200) {
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
          <Button as="button" onClick={() => console.log("Cart clicked")} variant="ghost">
            <Icon as={MdShoppingCart} boxSize={6} />
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
                <MenuItem key={category.id}>{category.name}</MenuItem>
              )
            })}
          </MenuList>
        </Menu>
        <Button pr={10}  variant="ghost">Popular products</Button>
      </Flex>
    </chakra.header>
  )
}

export default Navbar;
