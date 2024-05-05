import { Product } from "./Product";

export interface OrderDetail {
    id: number;
    orderId: number;
    product: Product;
    quantity: number;
    purchasePrice: number;
}