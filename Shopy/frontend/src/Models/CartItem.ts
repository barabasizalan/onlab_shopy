export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    name?: string;
    price?: number;
    imageBase64?: string;
}