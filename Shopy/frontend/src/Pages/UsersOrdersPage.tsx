import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchUsersOrdersAsync } from "../service/apiService";
import { Order } from "../Models/Order";
import OrderCard from "../components/Order/OrderCard";
import { Divider, Heading } from "@chakra-ui/react";

const UsersOrdersPage: React.FC = () =>{

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await fetchUsersOrdersAsync();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <>
            <Navbar />
            <Heading size="md" mt={4} ml={24}>
                My orders
            </Heading>
            <Divider bg="black" h="1px" ml={24} mb={5} mr={24} />
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </>
    );
}

export default UsersOrdersPage;