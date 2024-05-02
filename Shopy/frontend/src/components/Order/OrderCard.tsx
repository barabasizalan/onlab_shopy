import { Badge, Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Order } from "../../Models/Order";
import { grey } from "@mui/material/colors";

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {

    return (
        <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      m="4"
      boxShadow="md"
      width="80%"
      margin="0 auto"
    >
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            Order number: {order.id}
          </Text>
          <Badge color={grey}>
            {order.status.name}
          </Badge>
        </Flex>
        <Text mt="2">
          <b>Order Date:</b> {new Date(order.orderDate).toLocaleString()}
        </Text>
        <Text mt="2"><b>Payment Method:</b> {order.paymentMethod.method}</Text>
        <Text mt="4" fontWeight="bold">
          <b>Order Details:</b>
        </Text>
        <UnorderedList>
        {order.orderDetails.map((detail, index) => (
          <ListItem key={index}>
            Product ID: {detail.productId}, Quantity: {detail.quantity}, Price:{" "}
            {detail.purchasePrice}
          </ListItem>
        ))}
      </UnorderedList>
      </Box>
    );
            

};

export default OrderCard;