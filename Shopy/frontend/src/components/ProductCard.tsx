import {  Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Product } from "../Models/Product";

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    return (
        <HStack
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        width="auto"
        mb={4}
        p={4}
      >
        <Image src={atob(product.imageBase64)} alt={product.name} boxSize="100px" objectFit="cover" mr={10}/>
        <VStack width="auto" align="left">
            <Text mt={2} fontSize="lg" fontWeight="bold" whiteSpace="nowrap">
                {product.name}
            </Text>
            <Text fontSize="md" color="gray.500">
                Available Quantity: {product.quantity}
            </Text>
        </VStack>
        <Divider />
        <Text mt={2} fontSize="lg" fontWeight="bold">
          {product.price}€
        </Text>
        
      </HStack>
    );
};

export default ProductCard;