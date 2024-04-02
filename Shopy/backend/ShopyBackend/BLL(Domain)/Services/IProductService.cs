using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetProducts(int? limit);
        Task<IEnumerable<Product>> GetProductsByCategory(string category);
        Task<IEnumerable<ProductDto>> GetProductsByUserId(string userId);
        Task<IEnumerable<ProductDto>> SearchProducts(string queryString);
        Task PublishProduct(ProductFormDto productFromDto, string userId);
        Task DeleteProduct(int productId);

        Task UpdateProduct(int productId, ProductFormDto productFormDto, string userId);
    }
}
