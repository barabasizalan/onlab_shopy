export interface AddCartItemDto {
    productId: number;
    quantity: number;
    cartId: number;
};

export interface CartItemUpdateDto {
    cartId: number;
    cartItemId: number;
    newQuantity: number;
};

export interface CreateOrderDto {
    PaymentMethodId: number;
    CartId: number;
}