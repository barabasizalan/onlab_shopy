import React, { useState, useEffect } from "react";
import { VStack, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { Address } from "../../Models/Address";
import { createAddressAsync, updateAddressAsync, getUserAddress } from "../../service/apiService";


const AddressForm: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  const toast = useToast();

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const data = await getUserAddress();
    setAddress(data);
    setCountry(data?.country || "");
    setCity(data?.city || "");
    setStreet(data?.street || "");
    setZipCode(data?.zipCode || "");
  };

  const handleSave = async () => {
    const newAddress: Address = {
      country,
      city,
      street,
      zipCode,
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

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Country</FormLabel>
        <Input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>City</FormLabel>
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Address<small>(street, nr, ap, et)</small></FormLabel>
        <Input
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Postalcode</FormLabel>
        <Input
          placeholder="Zip code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleSave}
        width="100%"
      >
        {address ? "Update address" : "Save address"}
      </Button>
    </VStack>
  );
};

export default AddressForm;
