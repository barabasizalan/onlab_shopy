import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

interface CardProps {
  imageUrl: string;
  name: string;
  price: number;
  onClick?: () => void;
  margin: number;
}

const CategoryCard: React.FC<CardProps> = ({ imageUrl, name, price, onClick, margin: mx }) => {
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
        <Image src={imageUrl} alt={name} objectFit="scale-down" />
      </Box>
      <Box p="6" height="30%">
        <Text color="gray.500" fontWeight="semibold">
          {name}
        </Text>

        <Text mt="1" fontWeight="semibold" lineHeight="tight">
          {price} €
        </Text>
      </Box>
    </Box>
  );
};

export default CategoryCard;
