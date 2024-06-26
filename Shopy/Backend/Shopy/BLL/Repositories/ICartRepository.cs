﻿using BLL.DTO;
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
        Task<IEnumerable<Cart>> GetOwnedCartsAsync(string userId);
        Task CreateCartAsync(Cart cart);
        Task<Cart> GetCartByIdAsync(int cartId);
        Task DeleteCartItemsFromCartAsync(string userId);
        Task<Cart> GetCartByCodeAsync(string code);
        Task UpdateCartAsync(Cart cart);
        Task DeleteCartAsync(Cart cart);
    }
}
