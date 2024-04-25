import axios from "axios";
import { CartItem } from "../Models/CartItem";
import API_URLS from "./apiConfig";
import { Category } from "../Models/Category";
import { Product } from "../Models/Product";

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

export const deleteProductAsync = async (productId: number):Promise<void> => {
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
        const response = await axios.get(API_URLS.getProdyctById(productId));
        return response.data;
    } catch(error) {
        console.error('Error fetching product: ', error);
        throw error;
    }
}
