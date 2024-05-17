import { Button, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPhoneNumberAsync, updatePhoneNumberAsync } from "../../service/apiService";

const PhoneNumberForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchPhoneNumber();
  }, []);

  const fetchPhoneNumber = async () => {
    try {
      const data = await getPhoneNumberAsync();
      setPhoneNumber(data);
    } catch (error) {
      setError('Error fetching phone number');
      toast({
        title: "Error",
        description: "Error fetching phone number",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updatePhoneNumberAsync(phoneNumber);
      toast({
        title: "Success",
        description: "Phone number updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating phone number",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl id="phone" isInvalid={!!error}>
        <FormLabel>Phone number</FormLabel>
        <Input
          type="tel"
          placeholder="06 20 123 4567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          isDisabled={loading}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleSave}
        width="100%"
        isLoading={loading}
      >
        Update Phone Number
      </Button>
    </VStack>
  );
};

export default PhoneNumberForm;
