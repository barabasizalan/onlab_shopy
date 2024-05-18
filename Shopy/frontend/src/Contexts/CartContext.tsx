import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { addCartItemToCartAsync, createCartAsync, deleteCartItemAsync, deleteCartMemberAsync, fetchTotalPriceOfCartAsync, getAllCartsAsync, getCartMembersAsync, joinCartAsync, updateCartItemQuantityAsync } from "../service/apiService";
import { Cart } from "../Models/Cart";
import { AddCartItemDto, CartItemUpdateDto } from "../dtos/dtos";
import { useAuth } from "./AuthContext";

interface CartContextType {
    allCarts: Cart[];
    selectedCart: Cart | null;
    addToCart: (cartItemDto: AddCartItemDto) => Promise<void>;
    removeFromCart: (id: number) => Promise<void>;
    quantityChange: (cartItemUpdateDto: CartItemUpdateDto) => Promise<void>;
    cartTotalQuantity: number;
    createNewCart: (name: string) => Promise<void>;
    joinCart: (code: string) => Promise<void>;
    setSelectedCart: (cart: Cart | null) => void;
    totalPrice: number;
    fetchAllCarts: () => Promise<void>;
    cartMembers: string[];
    deleteCartMember: (username: string) => Promise<void>;
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
    const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
    const [selectedCartId, setSelectedCartId] = useState<number | null>(null);
    const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [cartMembers, setCartMembers] = useState<string[]>([]);

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if(isLoggedIn) {
            fetchAllCarts();
        } else {
            setAllCarts([]);
            setSelectedCart(null);
            setSelectedCartId(null);
        }
    }, [isLoggedIn]);



    useEffect(() => {
        if(selectedCart) {
            const totalQuantity = selectedCart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
            setCartTotalQuantity(totalQuantity);
            fetchTotalPriceOfCart(selectedCart.id);
            setSelectedCartId(selectedCart.id);
            fetchCartMembers(selectedCart.id);
            //save to localstorage, after refresh the active cart is still the one that was before..
            localStorage.setItem('selectedCartId', selectedCart.id.toString());
        }
    }, [selectedCart]);

    useEffect(() => {
        const selectedCartIdFromStorage = localStorage.getItem('selectedCartId');
        if(selectedCartIdFromStorage) {
            setSelectedCartId(Number(selectedCartIdFromStorage));
        }
    }, []);

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

            if (selectedCartId) {
                const selected = data.find(cart => cart.id === selectedCartId);
                setSelectedCart(selected ?? data[0]);
            } else {
                setSelectedCart(data[0]);
            }
        } catch(error) {
            console.error('Error fetching all carts:', error);
        }
    };

    const fetchCartMembers = async (cartId: number) => {
        try {
            const data = await getCartMembersAsync(cartId);
            setCartMembers(data);
        } catch(error) {
            console.error('Error fetching cart members:', error);
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

    const quantityChange = async (cartItemUpdateDto: CartItemUpdateDto) => {
        try {
            await updateCartItemQuantityAsync(cartItemUpdateDto);
            await fetchAllCarts();
        } catch(error) {
            console.error('Error changing quantity:', error);
        }
    };

    const deleteCartMember = async (username: string) => {
        try {
            if(selectedCart) {
                const removeMemberDto = {
                    username: username,
                    cartId: selectedCart.id
                }
                await deleteCartMemberAsync(removeMemberDto);
                await fetchCartMembers(selectedCart.id);
            }
        } catch(error) {
            console.error('Error deleting member:', error);
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
        totalPrice,
        fetchAllCarts,
        cartMembers,
        deleteCartMember
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
};

