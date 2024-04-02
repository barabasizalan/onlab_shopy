import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../Models/Product';
import { useSearchContext } from '../Contexts/SearchContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { Box, Flex, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Select, SimpleGrid } from '@chakra-ui/react';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router';

function ProductSearchPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(10000);
    const [sortOption, setSortOption] = useState<string>('');
    const [totalResults, setTotalResults] = useState<number>(0);

    const { query } = useSearchContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (query) {
                    response = await axios.get<Product[]>(`https://localhost:44367/Product/name=${query}`);
                } else {
                    response = await axios.get<Product[]>('https://localhost:44367/Product/all');
                }
                setProducts(response.data);
                setTotalResults(response.data.length);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts();
    }, [query]);
    

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
        const productJson = encodeURIComponent(JSON.stringify(product));
        navigate(`/product/${product.id}?product=${productJson}`);
      }

    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'alphabeticalAsc':
                return a.name.localeCompare(b.name);
            case 'alphabeticalDesc':
                return b.name.localeCompare(a.name);
            case 'price-ascending':
                return a.price - b.price;
            case 'price-descending':
                return b.price - a.price;
            default:
                return 0;
        }
    });

    return (
         <>
         <Navbar />
         <Flex>
             <Box w="15%" p={4} background={grey[200]}>
                 <Text fontSize="lg" fontWeight="bold" mb={2}>Price Range</Text>
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
                 <Text fontSize="small">Max Price: {maxPrice}  </Text>
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
             </Box>
             <Box flex="1" p={4}>
                 <Flex justify="space-between" mb={4}>
                    <Text fontSize="lg" fontWeight="bold">
                        {query ? `${totalResults} results found for "${query}"` : "All available products"}
                    </Text>
                    <Select value={sortOption} onChange={handleSortChange} w="auto">
                        <option value="alphabeticalAsc">Alphabetical(A-Z)</option>
                        <option value="alphabeticalDesc">Alphabetical(Z-A)</option>
                        <option value="price-ascending">Price Ascending</option>
                        <option value="price-descending">Price Descending</option>
                    </Select>
                 </Flex>
                 <SimpleGrid mx={100} columns={1} spacing={4}>
                    {sortedProducts.map(product => (
                        <Box key={product.id}>
                        <ProductCard
                            product={product}
                            onClick={() => handleCardClick(product)}
                        />
                        </Box>
                    ))}
                    </SimpleGrid>
             </Box>
         </Flex>
     </>
    );
}

export default ProductSearchPage;
