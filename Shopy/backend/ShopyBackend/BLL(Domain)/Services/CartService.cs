using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL;
using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        
        public CartService(ICartRepository cartRepository, IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<CartItemDto>> GetCartItems(string userId)
        { 
            var cartItems = await _cartRepository.GetAllCartItemsAsync(userId);
            var cartDtos = new List<CartItemDto>();

            foreach (var cart in cartItems)
            {
                cartDtos.Add(new CartItemDto
                {
                    Id = cart.Id,
                    ProductId = cart.ProductId,
                    Quantity = cart.Quantity
                });
            }
            return cartDtos;
        }

        public async Task AddToCart(string userId, AddToCartDto addToCartDto)
        {
            // Retrieve the product
            var product = await _productRepository.GetProductByIdAsync(addToCartDto.ProductId);
            if (product == null)
            {
                throw new Exception("Product not found.");
            }

            // Validate quantity
            if (addToCartDto.Quantity <= 0)
            {
                throw new Exception("Quantity must be greater than zero.");
            }
            if (addToCartDto.Quantity > product.Quantity)
            {
                throw new Exception("Not enough products in stock.");
            }

            // Add to cart
            var cart = new Cart
            {
                UserId = userId,
                ProductId = addToCartDto.ProductId,
                Quantity = addToCartDto.Quantity
            };

            await _cartRepository.AddToCartAsync(cart);
        }

        public async Task DeleteCartItem(int cartId)
        {
            await _cartRepository.DeleteFromCartAsync(cartId);
        }

        public async Task DeleteAllCartItems(string userId)
        {
            await _cartRepository.DeleteAllFromCartAsync(userId);
        }
        public async Task UpdateCartItemQuantity(int cartId, int newQuantity)
        {
            await _cartRepository.UpdateCartItemQuantityAsync(cartId, newQuantity);
        }
    }
}
