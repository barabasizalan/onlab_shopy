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
            return await _context.Carts.Include(c => c.Product).Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task AddToCartAsync(Cart cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFromCartAsync(int cartId)
        {
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart != null)
            {
                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAllFromCartAsync(string userId)
        {
            var cartItems = await _context.Carts.Where(c => c.UserId == userId).ToListAsync();
            if (cartItems != null)
            {
                _context.Carts.RemoveRange(cartItems);
                await _context.SaveChangesAsync();
            } else
            {
                throw new Exception("Cart is empty.");
            }
        }

        public async Task UpdateCartItemQuantityAsync(int cartId, int newQuantity)
        {
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart != null)
            {
                var product = await _context.Products.FindAsync(cart.ProductId);
                if (product != null)
                {
                    if (newQuantity > product.Quantity)
                    {
                        throw new Exception("Not enough products in stock.");
                    }
                } else
                {
                    throw new Exception("Product not found.");
                }

                if (newQuantity == 0)
                {
                    _context.Carts.Remove(cart);
                }
                else
                {
                    cart.Quantity = newQuantity;
                }
                await _context.SaveChangesAsync();
            } else
            {
                throw new Exception("Cart item not found.");
            }
        }
    }
}
