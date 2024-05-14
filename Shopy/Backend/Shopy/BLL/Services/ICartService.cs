using BLL.DTO;
using BLL.Entities;

namespace BLL.Services
{
    public interface ICartService
    {
        Task<IEnumerable<CartDto>> GetCarts(string userId);
        Task<Cart> GetCartByUserId(string userId);
        Task CreateCart(string userId);
    }
}
