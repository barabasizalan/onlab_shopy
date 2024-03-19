using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetProducts(int? limit);
        Task<IEnumerable<Product>> GetProductsByCategory(string category);
        Task<IEnumerable<Product>> SearchProducts(string queryString);
        Task PublishProduct(ProductFormDto productFromDto);
    }
}
