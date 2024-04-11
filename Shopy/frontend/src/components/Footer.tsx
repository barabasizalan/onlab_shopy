import { Box, Text } from '@chakra-ui/react';
import { grey } from '@mui/material/colors';

const Footer = () => {
  return (
    <Box bg={grey[300]} p={6} color="white" mt={2}>
      <Text textAlign="center" fontSize="lg" color="black">© 2024 My Awesome Website. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;