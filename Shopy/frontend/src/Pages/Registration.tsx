import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Text,
  FormControl,
  InputRightElement,
  InputLeftAddon,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

import { MdOutlineAlternateEmail } from "react-icons/md";
import axios from "axios";
import API_URLS from "../service/apiConfig";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdOutlineAlternateEmail = chakra(MdOutlineAlternateEmail);

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URLS.register, {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: phoneNumber
      });
      console.log(response.data);
      toast({
        title: "Successful registration",
        description: "Please log in to continue.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top"
      })

      navigate('/');
      
    } catch (error: any) {
      console.error('Registration failed: ', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast({
          title: "Registration failed",
          description: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      } else {
        toast({
          title: "Registration failed",
          description: "Please enter valid data.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center">

      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">
        <Heading color="teal.400">Ready to shop? Let's get started!</Heading>
        <Text> Fill out the form below and let the shopping spree begin!</Text>
        <Box minW={{ base: "90%", md: "568px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.400" />}
                  />
                  <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"/>
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CMdOutlineAlternateEmail color="gray.400" />}
                  />
                  <Input 
                    type="email"
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.400" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.400" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon>
                    +36
                  </InputLeftAddon>
                  <Input
                    type='tel'
                    placeholder='xx xxx xxxx'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="off"
                  />
                </InputGroup>
              </FormControl>
              
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Do you already have an account?{" "}
        <ChakraLink as={ReactRouterLink} color="teal.500" to="/login">
          Log in now
        </ChakraLink>
      </Box>
    </Flex>
  );
};

export default Registration
