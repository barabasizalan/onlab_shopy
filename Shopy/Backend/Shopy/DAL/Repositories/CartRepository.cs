using BLL.Entities;
using BLL.Repositories;
using DAL.DbContext;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class CartRepository : ICartRepository
     {
        private readonly ShopyDbContext _context;

        public CartRepository(ShopyDbContext context)
        {
            _context = context;
        }

        public async Task AddUserToCartAsync(string userId, string cartCode)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.Code == cartCode);
            if (cart == null)
            {
                throw new Exception("Cart not found.");
            }
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found.");
            }
            cart.Members.Add(user);
            await _context.SaveChangesAsync();
        }

        public Task<CartItem> GetCartItemAsync(string userId, int productId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Cart>> GetOwnedCartsAsync(string userId)
        {
            var carts =  await _context.Carts.Where(c => c.OwnerUserId == userId).Include(c => c.CartItems).ToListAsync();
            if (carts == null)
            {
                return new List<Cart>();
            }
            return carts;
        }

        public async Task CreateCartAsync(Cart cart)
        {
            _ = _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
        }

        public async Task<Cart> GetCartByIdAsync(int cartId)
        {
            var cart = await _context.Carts.Include(c => c.CartItems).Include(c => c.Members).FirstOrDefaultAsync(c => c.Id == cartId);
            if (cart == null)
            {
                return null;
            }
            return cart;
        }

        public async Task DeleteCartItemsFromCartAsync(string userId)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.OwnerUserId == userId);
            if(cart == null)
            {
                throw new Exception("Cart not found.");
            }
            if (cart.CartItems != null)
            {
                cart.CartItems.Clear();
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Cart is empty.");
            }
        }

        public async Task<Cart> GetCartByCodeAsync(string code)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.Code == code);
            if (cart == null)
            {
                return null;
            }
            return cart;
        }

        public async Task UpdateCartAsync(Cart cart)
        {
            _ = _context.Carts.Update(cart);
            await _context.SaveChangesAsync();
        }

        public Task DeleteCartAsync(Cart cart)
        {
            _ = _context.Carts.Remove(cart);
            return _context.SaveChangesAsync();
        }
    }
}
