using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        
        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task<IEnumerable<CartDto>> GetCartItems(string userId)
        { 
            var cartItems = await _cartRepository.GetAllCartItemsAsync(userId);
            var cartDtos = new List<CartDto>();

            foreach (var cart in cartItems)
            {
                cartDtos.Add(new CartDto
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
