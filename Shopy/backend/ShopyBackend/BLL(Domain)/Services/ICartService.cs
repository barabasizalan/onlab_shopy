using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface ICartService
    {
        Task<IEnumerable<CartDto>> GetCartItems(string userId);
        Task AddToCart(string userId, AddToCartDto addToCartDto);
        Task DeleteCartItem(int cartId);
        Task DeleteAllCartItems(string userId);
        Task UpdateCartItemQuantity(int cartId, int newQuantity);
    }
}
