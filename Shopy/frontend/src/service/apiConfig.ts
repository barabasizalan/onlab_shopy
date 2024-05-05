const BASE_URL = "https://localhost:44367";

interface ApiEndpoints {
  login: string;
  logout: string;
  register: string;
  createAddress: string;
  getAllCartItems: string;
  addProductToCart: string;
  removeProductFromCart: (cartItemId: number) => string;
  updateCartItem: (cartItemId: number, newQuantity: number) => string;
  getCategories: string;
  createOrder: string;
  getUsersOrders: string;
  getAllProducts: (page?: number, pageSize?: number) => string;
  getUserProducts: string;
  publishProduct: string;
  deleteProduct: (productId: number) => string;
  updateProduct: (productId: number) => string;
  searchProducts: (query?: string, page?: number, pageSize?: number) => string;
  getProductsByCategoryId: (categoryId: number, page: number, pageSize: number) => string;
  getProductById: (productId: number) => string;
  getUserAddress: string;
  getPaymentMethods: string;
  updateUserAddress: string;
  getNumberOfCartItems: string;
  getTotalPriceOfCart: string;
}

const API_URLS: ApiEndpoints = {
  login: `${BASE_URL}/login?useSessionCookies=true`,
  logout: `${BASE_URL}/logout`,
  register: `${BASE_URL}/account/register`,
  createAddress: `${BASE_URL}/Address/create`,
  getAllCartItems: `${BASE_URL}/Cart/all`,
  addProductToCart: `${BASE_URL}/Cart/add`,
  removeProductFromCart: (cartItemId) =>
    `${BASE_URL}/Cart/delete/${cartItemId}`,
  updateCartItem: (cartItemId, newQuantity) => `${BASE_URL}/Cart/update/${cartItemId}?newQuantity=${newQuantity}`,
  getCategories: `${BASE_URL}/Category/all`,
  createOrder: `${BASE_URL}/Order/create-order`,
  getUsersOrders: `${BASE_URL}/Order/user/orders`,
  getAllProducts: (page?: number, pageSize?: number): string => {
    if (page !== undefined && pageSize !== undefined) {
      return `${BASE_URL}/Product/all?page=${page}&pageSize=${pageSize}`;
    } else {
      return `${BASE_URL}/Product/all`;
    }
  },
  getUserProducts: `${BASE_URL}/Product/user/all`,
  publishProduct: `${BASE_URL}/Product/publish`,
  deleteProduct: (productId) => `${BASE_URL}/Product/delete/${productId}`,
  updateProduct: (productId) => `${BASE_URL}/Product/update/${productId}`,
  searchProducts: (query, page, pageSize): string => {
    if (query && !page && !pageSize) {
      return `${BASE_URL}/Product/search?queryString=${query}`;
    } else {
      return `${BASE_URL}/Product/search?queryString=${query}&page=${page}&pageSize=${pageSize}`;
    }
  },
  getProductsByCategoryId: (categoryId, page, pageSize) =>
    `${BASE_URL}/Product/category/${categoryId}?page=${page}&pageSize=${pageSize}`,
  getProductById: (productId) => `${BASE_URL}/Product/${productId}`,
  getUserAddress: `${BASE_URL}/Address/my`,
  getPaymentMethods: `${BASE_URL}/PaymentMethod/all`,
  updateUserAddress: `${BASE_URL}/Address/update`,
  getNumberOfCartItems: `${BASE_URL}/Cart/number-of-items`,
  getTotalPriceOfCart: `${BASE_URL}/Cart/total-price`,
};

export default API_URLS;
