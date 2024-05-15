import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { addCartItemToCartAsync, createCartAsync, deleteCartItemAsync, fetchTotalPriceOfCartAsync, getAllCartsAsync, joinCartAsync } from "../service/apiService";
import { Cart } from "../Models/Cart";
import { AddCartItemDto } from "../dtos/dtos";

interface CartContextType {
    allCarts: Cart[];
    selectedCart: Cart | null;
    addToCart: (cartItemDto: AddCartItemDto) => Promise<void>;
    removeFromCart: (id: number) => Promise<void>;
    quantityChange: (id: number, value: number) => Promise<void>;
    cartTotalQuantity: number;
    createNewCart: (name: string) => Promise<void>;
    joinCart: (code: string) => Promise<void>;
    setSelectedCart: (cart: Cart | null) => void;
    totalPrice: number;
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
    const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        fetchAllCarts();
    }, []);

    useEffect(() => {
        if(selectedCart) {
            const totalQuantity = selectedCart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
            setCartTotalQuantity(totalQuantity);
            fetchTotalPriceOfCart(selectedCart?.id ?? 0);
        }
    }, [selectedCart]);

    //TODO: calculate total price of cart

    const createNewCart = async (name: string) => {
        try {
            await createCartAsync(name);
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
            setSelectedCart(data[0]);
        } catch(error) {
            console.error('Error fetching all carts:', error);
        }
    };

    const fetchTotalPriceOfCart = async (cartId: number) => {
        try {
            const price = await fetchTotalPriceOfCartAsync(cartId);
            setTotalPrice(price);
        } catch(error) {
            throw error;
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
            //todo: implement quantity change
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
        cartTotalQuantity,
        createNewCart,
        joinCart,
        setSelectedCart,
        totalPrice
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
};

