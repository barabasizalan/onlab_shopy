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
    paymentMethodId: number;
    cartId: number;
};

export interface RemoveCartMemberDto {
    username: string;
    cartId: number;
};