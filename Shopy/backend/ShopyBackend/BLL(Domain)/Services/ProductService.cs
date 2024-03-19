using ShopyBackend.BLL_Domain_.Services;
using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.DAL
{
    public class ProductService: IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> GetProducts(int? limit)
        {
            var products = await _productRepository.GetAllProductsAsync();
            return limit.HasValue ? products.Take(limit.Value) : products;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategory(string category)
        {
            return await _productRepository.GetProductsByCategoryAsync(category);
        }

        public async Task<IEnumerable<Product>> SearchProducts(string queryString)
        {
            return await _productRepository.SearchProductsAsync(queryString);
        }
        public async Task PublishProduct(ProductFormDto productFormDto)
        {
            var product = new Product
            {
                Name = productFormDto.Name,
                Description = productFormDto.Description,
                Price = productFormDto.Price,
                Quantity = productFormDto.Quantity,
                CategoryId = productFormDto.CategoryId,
                Vat = 19,
                UserId = productFormDto.UserId,
                ImageData = productFormDto.ImageData
            };

            await _productRepository.AddProductAsync(product);
        }
    }
}
