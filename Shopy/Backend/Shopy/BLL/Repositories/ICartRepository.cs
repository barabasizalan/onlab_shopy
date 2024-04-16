using BLL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Repositories
{
    public interface ICartRepository
    {
        Task<IEnumerable<Cart>> GetAllCartItemsAsync(string userId);
        Task AddToCartAsync(Cart cart);
        Task DeleteFromCartAsync(int cartId);
        Task DeleteAllFromCartAsync(string userId);
        Task UpdateCartItemQuantityAsync(int cartId, int newQuantity);
    }
}
