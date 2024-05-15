import {
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  RadioGroup,
  Stack,
  Radio,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Address } from "../Models/Address";
import {
  createAddressAsync,
  createOrderAsync,
  fetchPaymentMethodsAsync,
  getUserAddress,
  updateAddressAsync,
} from "../service/apiService";
import CartItemCard from "../components/Cart/CartItemCard";
import { PaymentMethod } from "../Models/PaymentMethod";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useCart } from "../Contexts/CartContext";

const Checkout: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);

  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  const toast = useToast();
  const navigate = useNavigate();
  const { totalPrice, selectedCart } = useCart();

  useEffect(() => {
    fetchAddress();
    fetchPaymentMethods();
  }, []);

  const handleAddress = async () => {
    const newAddress: Address = {
      country: country,
      city: city,
      street: street,
      zipCode: zipCode,
    };
    if (address == null) {
      try {
        await createAddressAsync(newAddress);
        setAddress(newAddress);
        toast({
          title: "Address created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error creating address:", error);
        toast({
          title: "Error creating address",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      try {
        await updateAddressAsync(newAddress);
        setAddress(newAddress);
        toast({
          title: "Address updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error updating address:", error);
        toast({
          title: "Error updating address",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const fetchAddress = async () => {
    const data = await getUserAddress();
    setAddress(data);
    setCountry(data?.country || "");
    setCity(data?.city || "");
    setStreet(data?.street || "");
    setZipCode(data?.zipCode || "");
  };
  const fetchPaymentMethods = async () => {
    const data = await fetchPaymentMethodsAsync();
    setPaymentMethods(data);
  };

  const placeOrder = async (paymentMethodId: number) => {
    const data = await createOrderAsync(paymentMethodId);
    if (data) {
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
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input
              placeholder={address?.country || "Country"}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input
              placeholder={address?.city || "City"}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Address<small>(street, nr, ap, et)</small>
            </FormLabel>
            <Input
              placeholder={address?.street || "Street"}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Postalcode</FormLabel>
            <Input
              placeholder={address?.zipCode || "Zip code"}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleAddress}
            width="100%"
          >
            Save address
          </Button>
          <Divider />
        </VStack>
        <Heading as="h2" size="md" mt={8} mb={4}>
          Order summary
        </Heading>
        <VStack spacing={4}>
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
          onClick={() => placeOrder(selectedPaymentMethod)}
        >
          Place Order
        </Button>
      </Container>
    </>
  );
};

export default Checkout;
