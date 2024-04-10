using ShopyBackend.DAL.Entities;

namespace ShopyBackend.BLL_Domain_.Repository_interfaces
{
    public interface ICartRepository
    {
        Task<IEnumerable<Cart>> GetAllCartItemsAsync(string userId);
        Task AddToCartAsync(Cart cart);
        Task DeleteFromCartAsync(int cartId);
    }
}
