using BLL.Entities;
using BLL.DTO;

namespace BLL.Services
{
    public interface IProductService
    {
        Task<PagedProductDto> GetProducts(int? page, int? pageSize);
        Task<IEnumerable<Product>> GetProductsByCategory(int categoryId);
        Task<IEnumerable<ProductDto>> GetProductsByUserId(string userId);
        Task<PagedProductDto> SearchProducts(string queryString, int? page, int? pageSize);
        Task PublishProduct(ProductFormDto productFromDto, string userId);
        Task DeleteProduct(int productId);

        Task UpdateProduct(int productId, ProductFormDto productFormDto, string userId);
        Task<ProductDto> GetProductsById(int productId);
    }
}
