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
    public class ProductRepository : IProductRepository
    {
        private readonly ShopyDbContext _context;

        public ProductRepository(ShopyDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.Include(p => p.Image).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            var product = await _context.Products.Where(p => p.Id == id).Include(p => p.Image).FirstOrDefaultAsync();
            if (product == null)
            {
                throw new ArgumentException($"Product with ID {id} not found");
            }
            return product;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId)
        {
            return await _context.Products.Where(p => p.Category.Id == categoryId).ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsByUserIdAsync(string userId)
        {
            return await _context.Products.Where(p => p.UserId == userId).Include(p => p.Image).ToListAsync();
        }
        public async Task<IEnumerable<Product>> SearchProductsAsync(string queryString)
        {
            return await _context.Products.Where(p => p.Name.Contains(queryString)).Include(p => p.Image).ToListAsync();
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(Product product)
        {
            _context.Products.Remove(product);
            if (product.Image != null)
            {
                _context.Images.Remove(product.Image);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<decimal> GetProductPriceAsync(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                throw new ArgumentException($"Product with ID {productId} not found");
            }
            return product.Price;
        }

        public async Task UpdateProductQuantityAsync(int productId, int quantity)
        {
            var product = _context.Products.FindAsync(productId);
            if (product == null)
            {
                throw new ArgumentException($"Product with ID {productId} not found");
            }
            product.Result.Quantity -= quantity;
            await _context.SaveChangesAsync();
        }
    }
}
