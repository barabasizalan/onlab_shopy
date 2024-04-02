using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_.Services;
using ShopyBackend.DAL.DbContext;
using ShopyBackend.DAL.Entities;
using System.Security.Policy;

namespace ShopyBackend.DAL
{
    public class ProductRepository : IProductRepository
    {
        private readonly ShopyDbContext _context;

        public ProductRepository(ShopyDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Product.Include(p => p.Image).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Product.Where(p => p.Id == id).Include(p => p.Image).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category)
        {
            return await _context.Product.Where(p => p.Category.Name.Contains(category)).ToListAsync();
        }
        
        public async Task<IEnumerable<Product>> GetProductsByUserIdAsync(string userId)
        {
            return await _context.Product.Where(p => p.UserId == userId).Include(p => p.Image).ToListAsync();
        }
        public async Task<IEnumerable<Product>> SearchProductsAsync(string queryString)
        {
            return await _context.Product.Where(p => p.Name.Contains(queryString)).Include(p => p.Image).ToListAsync();
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Product.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            _context.Product.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(Product product)
        {
            _context.Product.Remove(product);
            if(product.Image != null)
            {
                _context.Images.Remove(product.Image);
            }
            await _context.SaveChangesAsync();
        }
    }
}
