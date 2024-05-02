import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { addToCartAsync, deleteCartItemAsync, fetchCartItemsAsync, updateCartItemAsync } from "../service/apiService";
import { CartItem } from "../Models/CartItem";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (productId: number, quantity: number) => Promise<void>;
    removeFromCart: (id: number) => Promise<void>;
    cartItemsTotalQuantity: number;
    quantityChange: (id: number, value: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
  }

export const CartProvider: React.FC<CartProviderProps> = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartItemsTotalQuantity, setCartItemsTotalQuantity] = useState<number>(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        const calculateTotalQuantity = () => {
            const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
            setCartItemsTotalQuantity(totalQuantity);
        };

        calculateTotalQuantity();
    }, [cartItems]);

    const fetchCartItems = async () => {
        try {
            const data = await fetchCartItemsAsync();
            setCartItems(data);
        } catch(error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const addToCart = async (productId: number, quantity: number) => {
        try {
            await addToCartAsync(productId, quantity);
            await fetchCartItems();
        } catch(error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeFromCart = async (id: number) => {
        try {
            await deleteCartItemAsync(id);
            await fetchCartItems();
        } catch(error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const quantityChange = async (id: number, value: number) => {
        try {
            await updateCartItemAsync(id, value);
            await fetchCartItems();
        } catch(error) {
            console.error('Error changing quantity:', error);
        }
    }
    const contextValue: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        cartItemsTotalQuantity,
        quantityChange
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
};

