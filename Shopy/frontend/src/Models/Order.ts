import { OrderDetail } from "./OrderDetail";
import { PaymentMethod } from "./PaymentMethod";
import { Status } from "./Status";

export interface Order {
    id: number;
    orderDate: string;
    status: Status;
    orderDetails: OrderDetail[];
    paymentMethod: PaymentMethod;
}