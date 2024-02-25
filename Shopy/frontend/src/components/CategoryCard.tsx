import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
  margin: number;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description, onClick, margin: mx }) => {
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
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Image src={imageUrl} alt={title} maxW="300"/>

      <Box p="6">
        <Text color="gray.500" fontWeight="semibold">
          {title}
        </Text>

        <Text mt="1" fontWeight="semibold" lineHeight="tight">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

export default Card;
