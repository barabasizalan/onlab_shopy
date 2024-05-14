using BLL.DTO;
using BLL.Entities;
using BLL.Repositories;
using DAL.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly ShopyDbContext _context;

        public CartItemRepository(ShopyDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CartItem>> GetCartItemsAsync(int id)
        {
            return await _context.CartItems.Where(x => x.CartId == id).ToListAsync();
        }

        public async Task<CartItem> GetCartItemAsync(int cartId, int productId)
        {
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(x => x.CartId == cartId && x.ProductId == productId);
            if (cartItem == null)
            {
                return null;
            }
            return cartItem;
        }

        public async Task AddCartItemAsync(CartItem cartItem)
        {
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

        }

        public async Task UpdateCartItemAsync(int cartItemId, int newQuantity)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);
            if (cartItem != null)
            {
                var product = await _context.Products.FindAsync(cartItem.ProductId);
                if(product != null)
                {
                    if(newQuantity > product.Quantity)
                    {
                        throw new Exception("Not enough products in stock.");
                    }
                } else
                {
                    throw new Exception("Product not found.");
                }

                if (newQuantity == 0)
                {
                    _context.CartItems.Remove(cartItem);
                } else
                {
                    cartItem.Quantity = newQuantity;
                }
                
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Cart item not found.");
            }
        }

        public async Task RemoveCartItemAsync(int cartItemId)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);
            if (cartItem == null)
            {
                throw new Exception("Cart item not found.");
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
        }
    }
}
