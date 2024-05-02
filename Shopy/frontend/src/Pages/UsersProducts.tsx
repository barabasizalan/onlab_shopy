import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import { Product } from "../Models/Product";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import {
  removeProductAsync,
  fetchUserProductsAsync,
  saveProductChangesAsync,
} from "../service/apiService";

function UsersProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const leastDestructiveRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await fetchUserProductsAsync();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId: number) => {
    setProductIdToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const deleteProduct = async (productId: number) => {
    try {
      await removeProductAsync(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      toast({
        title: "Product deleted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Product deletion failed!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditedProduct(null);
  };

  const handleSaveChanges = async () => {
    if (editedProduct) {
      try {
        await saveProductChangesAsync(editedProduct);
        fetchProducts();
        toast({
          title: "Product updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsEditModalOpen(false);
        setEditedProduct(null);
      } catch (error) {
        console.error("Error updating product:", error);
        toast({
          title: "Product update failed!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editedProduct) {
      const { name, value } = e.target;
      setEditedProduct((prevProduct) => ({
        ...(prevProduct as Product),
        [name]: value,
      }));
    }
  };

  return (
    <Box>
      <Navbar />
      <Heading size="md" mt={4} ml={24}>
        Your products
      </Heading>
      <Divider bg="black" h="1px" ml={24} mb={5} mr={24} />
      {products.map((product) => (
        <Center key={product.id}>
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
                <EditIcon
                  cursor="pointer"
                  mr="4"
                  onClick={() => handleEdit(product)}
                />
                <DeleteIcon
                  cursor="pointer"
                  onClick={() => handleDelete(product.id)}
                />
              </Flex>
            </Flex>
            <Text>Price: ${product.price}</Text>
            <Text>Quantity: {product.quantity}</Text>
            <Text>Description: {product.description}</Text>
          </Box>
        </Center>
      ))}

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  if (productIdToDelete !== null) {
                    deleteProduct(productIdToDelete);
                    setIsDeleteDialogOpen(false);
                  }
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isEditModalOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={handleEditModalClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Edit Product
            </AlertDialogHeader>

            <AlertDialogBody>
              {editedProduct && (
                <div>
                  <label htmlFor="name">Name:</label>
                  <Input
                    id="name"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="price">Price:</label>
                  <Input
                    id="price"
                    name="price"
                    value={editedProduct.price.toString()}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="quantity">Quantity:</label>
                  <Input
                    id="quantity"
                    name="quantity"
                    value={editedProduct.quantity.toString()}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="description">Description:</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleEditModalClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleSaveChanges} ml={3}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default UsersProducts;
