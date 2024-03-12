import { Image, Flex, Button, HStack, chakra, Menu, MenuButton, MenuList, MenuItem, Divider, Text, Box} from '@chakra-ui/react'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../Components.css';

function Navbar() {
  const {isLoggedIn} = useAuth();

  const handleImageClick = () => {
    window.location.href = '/';
  };


  return (
    <chakra.header id="header">
      <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-between"
        backgroundColor={"#bed1cf"}
        >
        <Box w="6%">
          <Link to="/" onClick={handleImageClick}>
            <Image src="https://seeklogo.com/images/S/shopee-logo-DD5CAE562A-seeklogo.com.png" alt="Shopy" paddingEnd={10}/>
          </Link>
        </Box>
        <SearchBar onSearch={(query) => console.log('Search Query:', query)} />

        <HStack as="nav" spacing="10">
          {!isLoggedIn ? (
            <Button as={Link} to="/login" variant="ghost">Login</Button>
          ) : (
            <Menu >
            <MenuButton as={Button} variant="ghost">My Profile</MenuButton>
            <MenuList className="ProfileDropDown">
                <Text m={3} fontSize="lg" fontWeight="bold">Welcome, username(todo)!</Text>
                <Divider />
                <MenuItem mb={2} mt={2} as={Link} to="/profile">Orders</MenuItem>
                <MenuItem mb={2} mt={2} as={Link} to="/orders">Published products</MenuItem>
                <MenuItem mb={2} mt={2} as={Link} to="/settings">Profile settings</MenuItem>
                <Divider />
                <MenuItem mt={2} as={Link} to="/logout">Logout</MenuItem>
            </MenuList>
          </Menu>
          )}
        </HStack>
        
        <HStack paddingStart="10">
          <Button>
            Sell
          </Button>
        </HStack>

      </Flex>
    </chakra.header>
  )
}

export default Navbar
