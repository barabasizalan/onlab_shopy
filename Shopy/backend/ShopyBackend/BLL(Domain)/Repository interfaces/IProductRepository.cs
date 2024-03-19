using ShopyBackend.DAL.Entities;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category);
        Task<IEnumerable<Product>> SearchProductsAsync(string queryString);
        Task AddProductAsync(Product product);
    }
}
