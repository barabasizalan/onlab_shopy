import { Image, Flex, Button, HStack, chakra} from '@chakra-ui/react'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function Navbar() {
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
        <Image src="https://seeklogo.com/images/S/shopee-logo-DD5CAE562A-seeklogo.com.png" alt="Shopy" h="50px" paddingEnd={10}/>

        <SearchBar onSearch={(query) => console.log('Search Query:', query)} />

        <HStack as="nav" spacing="10">
        <Button as={Link} to="/login" variant="ghost">Login</Button>
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
