using BLL.DTO;
using BLL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Repositories
{
    public interface ICartItemRepository
    {
        Task AddCartItemAsync(CartItem cartItem);
        Task<CartItem> GetCartItemAsync(int cartId, int productId);
        Task<CartItem> GetCartItemByIdAsync(int id);
        Task<IEnumerable<CartItem>> GetCartItemsAsync(int id);
        Task RemoveCartItemAsync(int cartItemId);
        Task UpdateCartItemAsync(int cartItemId, int newQuantity);
    }
}
