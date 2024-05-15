import { CartItem } from "./CartItem";

export interface Cart {
    id: number;
    cartItems: CartItem[];
    code: string;
    name: string;
    isOwner: boolean;
}