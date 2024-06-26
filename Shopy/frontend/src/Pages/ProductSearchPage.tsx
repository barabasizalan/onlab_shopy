import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../Models/Product";
import { useSearchContext } from "../Contexts/SearchContext";
import Navbar from "../components/Navbar";
import ProductCard from "../components/Product/ProductCard";
import {
  Box,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  SimpleGrid,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router";
import API_URLS from "../service/apiConfig";

function ProductSearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortOption, setSortOption] = useState<string>("nameAsc");
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const { query, selectedCategory } = useSearchContext();
  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [pageSize, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [query, page, pageSize, selectedCategory, sortOption]);

  const fetchProducts = async () => {
    try {
      let url = API_URLS.getAllProducts(sortOption, page, pageSize);
      let title = "All available products";
      if (query) {
        url = API_URLS.searchProducts(sortOption, query, page, pageSize, );
        title = `Search results for "${query}"`;
      } else if (selectedCategory) {
        url = API_URLS.getProductsByCategoryId(selectedCategory.id, sortOption, page, pageSize);
        title = `Every product for "${selectedCategory.name}"`;
      }
      const response = await axios.get<any>(url);
      setProducts(response.data.products);
      setTotalResults(response.data.totalCount);
      setTotalPages(Math.ceil(response.data.totalCount / pageSize));
      setCategoryTitle(title);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleMinPriceChange = (value: number) => {
    if (value < maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (value: number) => {
    if (value > minPrice) {
      setMaxPrice(value);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const handleCardClick = (product: Product) => {
    const productIdJson = encodeURIComponent(JSON.stringify(product.id));
    navigate(`/product/${productIdJson}`);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Navbar />
      <Flex>
        <Box w="15%" p={4} background={grey[200]}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Price Range
          </Text>
          <Text fontSize="small">Min Price: ${minPrice}</Text>
          <Slider
            min={0}
            max={10000}
            step={50}
            value={minPrice}
            onChange={handleMinPriceChange}
            aria-label="min-price-slider"
            mb={4}
          >
            <SliderTrack bg="gray.100">
              <SliderFilledTrack bg="blue.400" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <Text fontSize="small">Max Price: {maxPrice} </Text>
          <Slider
            min={0}
            max={10000}
            step={50}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            aria-label="max-price-slider"
            mb={4}
          >
            <SliderTrack bg="gray.100">
              <SliderFilledTrack bg="blue.400" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>

          <FormLabel>Results per page:</FormLabel>
          <Select value={pageSize} onChange={handlePageSizeChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        </Box>
        <Box flex="1" p={4}>
          <Flex justify="space-between" mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              {categoryTitle}
            </Text>
            <Select value={sortOption} onChange={handleSortChange} w="auto">
              <option value="nameAsc">Alphabetical(A-Z)</option>
              <option value="nameDesc">Alphabetical(Z-A)</option>
              <option value="priceAsc">Price Ascending</option>
              <option value="priceDesc">Price Descending</option>
            </Select>
          </Flex>
          <Box >
            <SimpleGrid columns={1} spacing={4}>
              {products.map((product) => (
                <Box key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => handleCardClick(product)}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          {totalResults > 0 && totalPages > 1 && (
            <Flex justify="center" mt={4}>
              {page > 1 && (
                <Button disabled={page === 1} onClick={handlePrevPage}>
                  Previous Page
                </Button>
              )}
              <Text m={2}>
                Page {page} of {totalPages}
              </Text>
              {page < totalPages && (
                <Button disabled={page === totalPages} onClick={handleNextPage}>
                  Next Page
                </Button>
              )}
            </Flex>
          )}
          {totalResults > 0 && totalPages === 1 && (
            <Flex justify="center" mt={4}>
              <Text>
                Page {page} of {totalPages}
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default ProductSearchPage;
