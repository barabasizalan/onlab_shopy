import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text, Center } from "@chakra-ui/react";
import { Product } from "../../Models/Product";

interface UserProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const UserProductCard: React.FC<UserProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <Center>
      <Box
        w="80%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m="2"
        p="2"
        bg="gray.200"
      >
        <Flex justify="space-between" align="center">
          <Heading as="h2" size="md">
            {product.name}
          </Heading>
          <Flex>
            <EditIcon cursor="pointer" mr="4" onClick={() => onEdit(product)} />
            <DeleteIcon
              cursor="pointer"
              onClick={() => onDelete(product.id)}
            />
          </Flex>
        </Flex>
        <Text>Price: ${product.price}</Text>
        <Text>Quantity: {product.quantity}</Text>
        <Text>Description: {product.description}</Text>
      </Box>
    </Center>
  );
};

export default UserProductCard;
