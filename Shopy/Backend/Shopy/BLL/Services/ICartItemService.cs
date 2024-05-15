using BLL.DTO;
using BLL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface ICartItemService
    {
        Task AddProductToCart(AddItemToCartDto addItemToCartDto);
        Task<CartItem> GetCartItemById(int id);
        Task RemoveProductFromCart(int cartItemId);
        Task UpdateCartItemQuantity(UpdateQuantityDto updateQuantityDto);
    }
}
