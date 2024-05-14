using BLL.DTO;
using BLL.Entities;

namespace BLL.Services
{
    public interface ICartService
    {
        Task<IEnumerable<CartDto>> GetOwnedCarts(string userId);
        Task<Cart> GetCartByUserId(string userId);
        Task CreateCart(string userId);
        Task<Cart> GetCartById(int cartId);
        Task<Cart> GetCartByCode(string code);
        Task<bool> JoinCart(string userId, int cartId);
        Task<IEnumerable<CartDto>> GetJoinedCarts(string userId);
    }
}
