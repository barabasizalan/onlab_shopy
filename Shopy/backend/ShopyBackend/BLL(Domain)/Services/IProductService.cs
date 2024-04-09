using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface IProductService
    {
        Task<PagedProductDto> GetProducts(int? page, int? pageSize);
        Task<IEnumerable<Product>> GetProductsByCategory(string category);
        Task<IEnumerable<ProductDto>> GetProductsByUserId(string userId);
        Task<PagedProductDto> SearchProducts(string queryString, int? page, int? pageSize);
        Task PublishProduct(ProductFormDto productFromDto, string userId);
        Task DeleteProduct(int productId);

        Task UpdateProduct(int productId, ProductFormDto productFormDto, string userId);
    }
}
