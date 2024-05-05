using BLL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync(string sortOption);
        Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId, string sortOption);
        Task<IEnumerable<Product>> GetProductsByUserIdAsync(string userId);
        Task<IEnumerable<Product>> SearchProductsAsync(string queryString, string sortOption);
        Task AddProductAsync(Product product);
        Task<Product> GetProductByIdAsync(int id);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(Product product);
        Task<decimal> GetProductPriceAsync(int productId);
        Task UpdateProductQuantityAsync(int productId, int quantity);
    }
}
