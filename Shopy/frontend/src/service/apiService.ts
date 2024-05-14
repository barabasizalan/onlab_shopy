import axios from "axios";
import { CartItem } from "../Models/CartItem";
import API_URLS from "./apiConfig";
import { Category } from "../Models/Category";
import { Product } from "../Models/Product";
import { Address } from "../Models/Address";
import { PaymentMethod } from "../Models/PaymentMethod";
import { Order } from "../Models/Order";
import { Cart } from "../Models/Cart";
import { AddCartItemDto } from "../dtos/AddCartItemDto";
import { CartItemUpdateDto } from "../dtos/CartItemUpdateDto";

export const fetchCartItemsAsync = async ():Promise<CartItem[]> => {
    try {
        const response = await axios.get<CartItem[]>(API_URLS.getAllCartItems);
        return response.data;
    } catch(error) {
        console.log('Error fetching cart items: ', error);
        throw error;
    }
};

export const fetchCategoriesAsync = async ():Promise<Category[]> => {
    try {
        const response = await axios.get<Category[]>(API_URLS.getCategories);
        return response.data;
    } catch(error) {
        console.log('Error fetching categories: ', error);
        throw error;
    }
};

export const fetchUserProductsAsync = async ():Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(API_URLS.getUserProducts);
        return response.data;
    } catch(error) {
        console.log('Error fetching products: ', error);
        throw error;
    }
};

export const removeProductAsync = async (productId: number):Promise<void> => {
    try {
        const response = await axios.delete(API_URLS.deleteProduct(productId));
        if (response.status === 200) {
            return;
        } else {
            throw new Error('Error deleting product');
        }
    } catch(error) {
        console.log('Error deleting product: ', error);
        throw error;
    }
};

export const saveProductChangesAsync = async (editedProduct: Product): Promise<void> => {
    try {
        const { id, categoryId, imageBase64, ...productFormDto } = editedProduct;
        const response = await axios.put(
            API_URLS.updateProduct(editedProduct.id),
            productFormDto
        );
        if (response.status === 200) {
            return;
        } else {
            throw new Error('Error updating product');
        }
    } catch(error) {
        console.error('Error updating product: ', error);
        throw error;
    }
};

export const addToCartAsync = async (productId: number, quantity: number): Promise<void> => {
    try {
        const response = await axios.post(API_URLS.addProductToCart, {
            productId: productId,
            quantity: quantity
        });
        if (response.status === 200) {
            return;
        } else {
            throw new Error('Error adding product to cart');
        }
    } catch(error) {
        console.error('Error adding product to cart: ', error);
        throw error;
    }
};

export const getProductById = async (productId: number): Promise<Product> => {
    try {
        const response = await axios.get(API_URLS.getProductById(productId));
        return response.data;
    } catch(error) {
        console.error('Error fetching product: ', error);
        throw error;
    }
};

export const deleteCartItemAsync = async (cartItemId: number): Promise<void> => {
    try {
        const response = await axios.delete(API_URLS.removeProductFromCart(cartItemId));
        if (response.status === 200) {
            return;
        } else {
            throw new Error('Error deleting cart item');
        }
    } catch(error) {
        console.error('Error deleting cart item: ', error);
        throw error;
    }
};

export const updateCartItemAsync = async (cartItemId: number, quantity: number): Promise<void> => {
    try {
        const response = await axios.put(API_URLS.updateCartItem(cartItemId, quantity));
        if (response.status === 200) {
            return;
        } else {
            throw new Error('Error updating cart item');
        }
    } catch(error) {
        console.error('Error updating cart item: ', error);
        throw error;
    }
};

export const getUserAddress = async (): Promise<Address> => {
    try {
        const response = await axios.get(API_URLS.getUserAddress);
        if(response.status === 404) {
            throw new Error('No address found');
        }
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error fetching address');
        }
    } catch(error) {
        console.error('Error fetching address: ', error);
        throw error;
    }
};

export const fetchPaymentMethodsAsync = async (): Promise<PaymentMethod[]> => {
    try {
        const response = await axios.get(API_URLS.getPaymentMethods);
        return response.data;
    } catch(error) {
        console.error('Error fetching payment methods: ', error);
        throw error;
    }
};

export const createOrderAsync = async (paymentMethodId: number): Promise<boolean> => {
    try {
        const response = await axios.post(API_URLS.createOrder, {
            paymentMethodId: paymentMethodId
        });
        if (response.status === 200) {
            return true;
        } else {
            throw new Error('Error creating order');
        }
    } catch(error) {    
        console.error('Error creating order: ', error);
        throw error;
    }
};

export const updateAddressAsync = async (address: Address): Promise<void> => {
    try {
        const response = await axios.put(API_URLS.updateUserAddress, address);
        if (response.status === 200) {
            return;
        } else {
            throw new Error('Error updating address');
        }
    } catch(error) {
        console.error('Error updating address: ', error);
        throw error;
    }
};

export const fetchNumberOfCartElements = async (): Promise<number> => {
    try {
        const response = await axios.get(API_URLS.getNumberOfCartItems);
        if(response.status === 200 && Number(response.data) > 0) {
            return Number(response.data);
        } else {
            return 0;
        }
    } catch(error) {
        console.error('Error fetching number of cart items: ', error);
        throw error;
    }
};

export const fetchTotalPriceOfCart = async (): Promise<number> => {
    try {
        const response = await axios.get(API_URLS.getTotalPriceOfCart);
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error fetching total price of cart');
        }
    } catch(error) {
        console.error('Error fetching total price of cart: ', error);
        throw error;
    }
};

export const fetchUsersOrdersAsync = async (): Promise<Order[]> => {
    try {
        const response = await axios.get<Order[]>(API_URLS.getUsersOrders);
        return response.data;
    } catch(error) {
        console.error('Error fetching user orders: ', error);
        throw error;
    }
};

export const fetchProductsByCategoryAsync = async (categoryId: number, sortOption: string, page: number, pageSize: number): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(API_URLS.getProductsByCategoryId(categoryId, sortOption, page, pageSize));
        return response.data;
    } catch(error) {
        console.error('Error fetching products by category: ', error);
        throw error;
    }
};

export const getRoleAsync = async (email: string): Promise<string> => {
    try {
        const response = await axios.get(API_URLS.getUserRole(email));
        return response.data;
    } catch(error) {
        console.error('Error fetching user role: ', error);
        throw error;
    }
};

export const createAddressAsync = async (address: Address): Promise<void> => {
    try {
        const response = await axios.post(API_URLS.createAddress, address);
        if (response.status === 200) {
            return;
        } else {
            throw new Error('Error creating address');
        }
    } catch(error) {
        console.error('Error creating address: ', error);
        throw error;
    }
};

// Cart endpoints
export const getAllOwnedCartsAsync = async (): Promise<Cart[]> => {
    try {
        const response = await axios.get<Cart[]>(API_URLS.getAllOwnedCarts);
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error fetching owned carts');
        }
    } catch(error) {
        throw error;
    }
};

export const createCartAsync = async (): Promise<void> => {
    try {
        const response = await axios.post(API_URLS.createCart);
        if(response.status === 200) {
            return;
        } else {
            throw new Error('Error creating cart');
        }
    } catch(error) {
        throw error;
    }
};

export const getTotalQuantityOfCartAsync = async (cartId: number): Promise<number> => {
    try {
        const response = await axios.get(API_URLS.getTotalQuantityOfCart(cartId));
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error fetching total quantity of cart');
        }
    } catch(error) {
        throw error;
    }
};

export const joinCartAsync = async (code: string): Promise<void> => {
    try {
        const response = await axios.post(API_URLS.joinCart(code));
        if(response.status === 200) {
            return;
        } else {
            throw new Error('Error joining cart');
        }
    } catch(error) {
        throw error;
    }
};

export const getAllJoinedCartsAsync = async (): Promise<Cart[]> => {
    try {
        const response = await axios.get<Cart[]>(API_URLS.getAllJoinedCarts);
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error fetching joined carts');
        }
    } catch(error) {
        throw error;
    }
};

// CartItem endpoints
export const addCartItemToCartAsync = async (addCartItemDto: AddCartItemDto): Promise<void> => {
    try {
        const response = await axios.post(API_URLS.addCartItemToCard, addCartItemDto);
        if(response.status === 200) {
            return;
        } else {
            throw new Error('Error adding cart item');
        }
    } catch(error) {
        throw error;
    }
};

// export const deleteCartItemAsync = async (cartItemId: number): Promise<void> => {
//     try {
//         const response = await axios.delete(API_URLS.deleteCartItem(cartItemId));
//         if(response.status === 200) {
//             return;
//         } else {
//             throw new Error('Error deleting cart item');
//         }
//     } catch(error) {
//         throw error;
//     }
// };

export const updateCartItemQuantityAsync = async (cartItemUpdateDto: CartItemUpdateDto): Promise<void> => {
    try {
        const response = await axios.put(API_URLS.updateCartItemQuantity, cartItemUpdateDto);
        if(response.status === 200) {
            return;
        } else {
            throw new Error('Error updating cart item quantity');
        }
    } catch(error) {
        throw error;
    }
};


