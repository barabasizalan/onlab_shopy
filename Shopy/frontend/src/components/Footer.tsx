import { Box, Button, Center, Text } from '@chakra-ui/react';
import { grey } from '@mui/material/colors';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router';

const Footer = () => {

  const {isAdmin} = useAuth();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };
  
  return (
    <Box as="footer" bg={grey[300]} p={6} color="white" bottom="0" left="0" right="0">
      <Text textAlign="center" fontSize="lg" color="black">© 2024 My Awesome Website. All rights reserved.</Text>
      { isAdmin &&
        <Center>
          <Button colorScheme="black" onClick={handleAdminClick}>Admin</Button>
        </Center>
      }
    </Box>
  );
};

export default Footer;