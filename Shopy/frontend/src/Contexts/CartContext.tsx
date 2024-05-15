import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { addCartItemToCartAsync, createCartAsync, deleteCartItemAsync, getAllCartsAsync, joinCartAsync, updateCartItemAsync } from "../service/apiService";
import { Cart } from "../Models/Cart";
import { AddCartItemDto } from "../dtos/dtos";

interface CartContextType {
    allCarts: Cart[];
    selectedCart: Cart | null;
    addToCart: (cartItemDto: AddCartItemDto) => Promise<void>;
    removeFromCart: (id: number) => Promise<void>;
    quantityChange: (id: number, value: number) => Promise<void>;
    createNewCart: () => Promise<void>;
    joinCart: (code: string) => Promise<void>;
    setSelectedCart: (cart: Cart) => void;
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
    const [allCarts, setAllCarts] = useState<Cart[]>([]);
    const [selectedCart, setSelectedCart] = useState<Cart | null>(null); // Initialize selectedCart


    useEffect(() => {
        fetchAllCarts();
        setSelectedCart(allCarts[0]);
    }, []);

    //TODO: calculate total price of cart

    const createNewCart = async () => {
        try {
            await createCartAsync();
            await fetchAllCarts();
        } catch(error) {
            console.error('Error creating new cart:', error);
        }
    };

    const joinCart = async (code: string) => {
        try {
            await joinCartAsync(code);
            await fetchAllCarts();
        } catch(error) {
            console.error('Error joining cart:', error);
        }
    };

    const fetchAllCarts = async () => {
        try {
            const data = await getAllCartsAsync();
            setAllCarts(data);
        } catch(error) {
            console.error('Error fetching all carts:', error);
        }
    };

    const addToCart = async (cartItemDto: AddCartItemDto) => {
        try {
            await addCartItemToCartAsync(cartItemDto);
            await fetchAllCarts();
        } catch(error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeFromCart = async (id: number) => {
        try {
            await deleteCartItemAsync(id);
            await fetchAllCarts();
        } catch(error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const quantityChange = async (id: number, value: number) => {
        try {
            await updateCartItemAsync(id, value);
            await fetchAllCarts();
        } catch(error) {
            console.error('Error changing quantity:', error);
        }
    };

    const contextValue: CartContextType = {
        allCarts,
        selectedCart,
        addToCart,
        removeFromCart,
        quantityChange,
        createNewCart,
        joinCart,
        setSelectedCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
};

