import {
  Container,
  Heading,
  VStack,
  Divider,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  createOrderAsync,
  fetchPaymentMethodsAsync,
} from "../service/apiService";
import CartItemCard from "../components/Cart/CartItemCard";
import { PaymentMethod } from "../Models/PaymentMethod";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useCart } from "../Contexts/CartContext";
import { CreateOrderDto } from "../dtos/dtos";
import AddressForm from "../components/forms/AddressForm";

const Checkout: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);

  const toast = useToast();
  const navigate = useNavigate();
  const { totalPrice, selectedCart, fetchAllCarts } = useCart();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    const data = await fetchPaymentMethodsAsync();
    setPaymentMethods(data);
  };

  const placeOrder = async () => {
    const createOrderDto: CreateOrderDto = {
      paymentMethodId: selectedPaymentMethod,
      cartId: selectedCart?.id ?? 0
    };
    const data = await createOrderAsync(createOrderDto);
    if (data) {
      await fetchAllCarts();
      toast({
        title: "Order placed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "Error placing order",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container maxW="lg" py={8}>
        <Heading as="h1" size="lg" mb={4}>
          Checkout
        </Heading>
        <Divider />
        <Heading as="h2" size="md" mt={8} mb={4}>
          Shipping Information
        </Heading>
        <AddressForm />
        <Divider />
        <Heading as="h2" size="md" mt={8} mb={4}>
          Order summary
        </Heading>
        <VStack spacing= {4}>
          {selectedCart?.cartItems?.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </VStack>
        <Divider />
        <Heading as="h2" size="md" mt={8} mb={4}>
          Payment
        </Heading>
        <Divider />
        <RadioGroup defaultValue="1" mb={4}>
          {paymentMethods?.map((payment) => (
            <Stack key={payment.id} direction="row">
              <Radio
                value={String(payment.id)}
                onClick={() => setSelectedPaymentMethod(payment.id)}
              >
                {payment.method}
              </Radio>
            </Stack>
          ))}
        </RadioGroup>
        <Divider />
        <Text fontSize="lg" fontWeight="bold" mt={4}>
          Total: {totalPrice} €
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          mt={8}
          width="100%"
          onClick={() => placeOrder()}
        >
          Place Order
        </Button>
      </Container>
    </>
  );
};

export default Checkout;
