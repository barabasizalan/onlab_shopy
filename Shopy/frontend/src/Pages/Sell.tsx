import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Image,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Category } from "../Models/Category";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";

function Sell() {
  const [image, setImage] = useState<string>(
    "https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png"
  );
  const [name, setName] = useState<string>("");
  const [nameCharCount, setNameCharCount] = useState<number>(0); // State to keep track of character count for Name

  const [description, setDescription] = useState<string>("");
  const [descriptionCharCount, setDescriptionCharCount] = useState<number>(0);

  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // State to track selected category

  const {userId} = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "https://localhost:44367/Category/all"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= 60) {
      setName(inputText);
      setNameCharCount(inputText.length);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= 5000) { 
      setDescription(inputText);
      setDescriptionCharCount(inputText.length);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name,
      description,
      price,
      quantity,
      categoryId: selectedCategoryId,
      userId: userId,
      imageData: null,
    };

    try {
      await axios.post('https://localhost:44367/product/publish', formData);

      console.log('Product published successfully!');
    } catch (error) {
      console.error('Error publishing product:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Box p={4} bg="gray.200">
        <Box maxW="600px" mx="auto" bg="white" p={4} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Publish your product
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="name" mb={4} isRequired>
              <FormLabel>Add title</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={handleNameChange}
                autoComplete="off"
                maxLength={60}
                required
              />
              <Text fontSize="sm" color={nameCharCount === 60 ? "red" : "gray"}>
                {nameCharCount}/60
              </Text>
            </FormControl>
            <FormControl id="category" mb={4} isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select Category"
                required
                w="50%"
                onChange={(e) => setSelectedCategoryId(parseInt(e.target.value))}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="photo" mb={4} isRequired>
              <FormLabel>Select your product's photo</FormLabel>
              <Box flex="1" mr={4}>
                <Box mb={4}>
                  <Image src={image} alt="Product" maxH="200px" maxW="200px" />
                </Box>
                <input type="file" onChange={handleImageChange} required />
              </Box>
            </FormControl>
            <FormControl id="description" mb={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                aria-required="true"
                value={description}
                onChange={handleDescriptionChange}
                resize="none"
                autoComplete="off"
                minLength={50}
                maxLength={5000}
                required
              />
              <Text fontSize="sm" color={(descriptionCharCount < 50 || descriptionCharCount > 5000) ? "red" : "gray"}>
                {descriptionCharCount}/5000 
              </Text>
            </FormControl>
            <FormControl id="price" mb={4} isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                autoComplete="off"
                required
              />
            </FormControl>
            <FormControl id="quantity" mb={4} isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                autoComplete="off"
                max={9999}
                required
              />
            </FormControl>
            <Button colorScheme="blue" bg="#bed1cf" color="black" type="submit" w="100%">
              Publish
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Sell;
