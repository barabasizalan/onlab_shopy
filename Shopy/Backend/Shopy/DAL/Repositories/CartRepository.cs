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

        public async Task<IEnumerable<CartItem>> GetAllCartItemsAsync(string userId)
        {
            return await _context.CartItems.Include(c => c.Product).ToListAsync();
        }

        public async Task AddToCartAsync(CartItem cart)
        {
            _context.CartItems.Add(cart);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFromCartAsync(int cartId)
        {
            var cart = await _context.CartItems.FindAsync(cartId);
            if (cart != null)
            {
                _context.CartItems.Remove(cart);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Cart item not found.");
            }
        }

        public async Task UpdateCartItemQuantityAsync(int cartId, int newQuantity)
        {
            var cart = await _context.CartItems.FindAsync(cartId);
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
                    _context.CartItems.Remove(cart);
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

        // public async Task<CartItem> GetCartItemAsync(string userId, int productId) => await _context.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

        public async Task<int> GetNumberOfCartItemsAsync(string userId)
        {
            var cartItems = await _context.CartItems.ToListAsync();
            return cartItems.Sum(c => c.Quantity);
        }

        public async Task<IEnumerable<Cart>> GetAllCartsForUserAsync(string userId)
        {
            return await _context.Carts.Include(c => c.Members).Where(c => c.Members.Any(u => u.Id == userId)).ToListAsync();
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

        public async Task<IEnumerable<Cart>> GetCartsAsync(string userId)
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
            var cart = await _context.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.Id == cartId);
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
    }
}
