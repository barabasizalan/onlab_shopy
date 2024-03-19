using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_.Services;
using ShopyBackend.DAL.DbContext;
using ShopyBackend.DAL.Entities;

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
            return await _context.Product.ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category)
        {
            return await _context.Product.Where(p => p.Category.Name.Contains(category)).ToListAsync();
        }

        public async Task<IEnumerable<Product>> SearchProductsAsync(string queryString)
        {
            return await _context.Product.Where(p => p.Name.Contains(queryString)).ToListAsync();
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Product.Add(product);
            await _context.SaveChangesAsync();
        }
    }
}
