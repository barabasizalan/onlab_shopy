import { Box, Flex, Image, Text, chakra } from '@chakra-ui/react';

interface CardProps {
  imageBase64: string;
  name: string;
  price: number;
  onClick?: () => void;
  margin: number;
}

const HomeProductCard: React.FC<CardProps> = ({ imageBase64, name, price, onClick, margin: mx }) => {

  const decodedImage = atob(imageBase64);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      cursor="pointer"
      onClick={onClick}
      mx={mx}
      height="300px"
      width="300px"
      display="flex"
      flexDirection="column"
    >
      <Box m="6" height="70%" borderRadius="lg" overflow="hidden" display="flex" justifyContent="center" alignItems="center"> 
        <Image src={decodedImage} alt={name} objectFit="scale-down" objectPosition="center" height="100%" width="100%" />
      </Box>
      <Box p="6" height="30%">
        <Text color="gray.500" fontWeight="semibold">
          {name}
        </Text>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          roundedBottom="lg">
          <chakra.h1 color="black" fontWeight="semibold" fontSize="lg">
            {price} €
          </chakra.h1>
          <chakra.button
            px={2}
            py={1}
            bg="black"
            fontSize="xs"
            color="white"
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: "gray.700",
            }}
            _focus={{
              bg: "gray.500",
            }}
            >
              Add to cart
            </chakra.button>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomeProductCard;
