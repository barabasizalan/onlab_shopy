import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartItem } from "../Models/CartItem";

interface CartItemProps {
    item: CartItem;
}

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
    const { name, price, quantity, imageBase64} = item;

    let decodedImage = '';
    if (imageBase64 !== undefined) {
        decodedImage = atob(imageBase64);
    }

    const handleIncreaseQuantity = () => {
        console.log('Increase quantity');
    }

    const handleDecreaseQuantity = () => {
        console.log('Decrease quantity');
    }

    const handleDeleteItem = () => {
        console.log('Delete item');
    }

    return (
        <Box border={'1px solid black'} p={4} mb={4} borderRadius="20px">
            <Flex alignItems='center' justifyContent='space-between' mb={2}>
                <Image src={decodedImage} alt={name} boxSize="60px" />
                <Text>{name}</Text>
                <Flex alignItems='center'>
                    <IconButton aria-label="Decrease quantity" icon={<AiOutlineMinus />} onClick={handleDecreaseQuantity} mr={2} />
                    <Text>{quantity}</Text>
                    <IconButton aria-label="Increase quantity" icon={<AiOutlinePlus />} onClick={handleIncreaseQuantity} ml={2} />
                    <Text>{price}</Text>
                    <IconButton aria-label="Delete item" icon={<AiOutlineDelete />} onClick={handleDeleteItem} ml={2} />
                </Flex>
            </Flex>
        </Box>
    );
};

export default CartItemCard;