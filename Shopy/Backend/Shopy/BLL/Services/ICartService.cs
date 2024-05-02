using BLL.DTO;

namespace BLL.Services
{
    public interface ICartService
    {
        Task<IEnumerable<CartItemDto>> GetCartItems(string userId);
        Task AddToCart(string userId, AddToCartDto addToCartDto);
        Task DeleteCartItem(int cartId);
        Task DeleteAllCartItems(string userId);
        Task UpdateCartItemQuantity(int cartId, int newQuantity);
        Task<int> GetNumberOfCartItems(string userId);
    }
}
