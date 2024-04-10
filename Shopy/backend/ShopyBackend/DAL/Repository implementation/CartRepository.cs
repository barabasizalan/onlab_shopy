using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL.DbContext;
using ShopyBackend.DAL.Entities;

namespace ShopyBackend.DAL.Repository_implementation
{
    public class CartRepository : ICartRepository
    {
        private readonly ShopyDbContext _context;

        public CartRepository(ShopyDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cart>> GetAllCartItemsAsync(string userId)
        {
            return await _context.Cart.Include(c => c.Product).Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task AddToCartAsync(Cart cart)
        {
            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFromCartAsync(int cartId)
        {
            var cart = await _context.Cart.FindAsync(cartId);
            if (cart != null)
            {
                _context.Cart.Remove(cart);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAllFromCartAsync(string userId)
        {
            var cartItems = await _context.Cart.Where(c => c.UserId == userId).ToListAsync();
            if (cartItems != null)
            {
                _context.Cart.RemoveRange(cartItems);
                await _context.SaveChangesAsync();
            } else
            {
                throw new Exception("Cart is empty.");
            }
        }

        public async Task UpdateCartItemQuantityAsync(int cartId, int newQuantity)
        {
            var cart = await _context.Cart.FindAsync(cartId);
            if (cart != null)
            {
                cart.Quantity = newQuantity;
                await _context.SaveChangesAsync();
            } else
            {
                throw new Exception("Cart item not found.");
            }
        }
    }
}
