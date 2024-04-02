using Microsoft.Extensions.Logging.Abstractions;
using ShopyBackend.BLL_Domain_.Services;
using ShopyBackend.DAL.Entities;
using ShopyBackend.WebApi.DTO;

namespace ShopyBackend.DAL
{
    public class ProductService: IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IImageService _imageService;

        public ProductService(
            IProductRepository productRepository,
            IImageService imageService
            )
        {
            _productRepository = productRepository;
            _imageService = imageService;
        }

        public async Task<IEnumerable<ProductDto>> GetProducts(int? limit)
        {
            var products = await _productRepository.GetAllProductsAsync();
            var productDtos = new List<ProductDto>();

            foreach(var product in products)
            {
                productDtos.Add(new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    CategoryId = product.CategoryId,
                    ImageBase64 = Convert.ToBase64String(product.Image.ImageData)
                });

            }

            return limit.HasValue ? productDtos.Take(limit.Value) : productDtos;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategory(string category)
        {
            return await _productRepository.GetProductsByCategoryAsync(category);
        }

        public async Task<IEnumerable<ProductDto>> SearchProducts(string queryString)
        {
            var products = await _productRepository.SearchProductsAsync(queryString);
            var productDtos = new List<ProductDto>();

            foreach (var product in products)
            {
                productDtos.Add(new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    CategoryId = product.CategoryId,
                    ImageBase64 = Convert.ToBase64String(product.Image.ImageData)
                });
            }
            return productDtos;
        }

        public async Task<IEnumerable<ProductDto>> GetProductsByUserId(string userId)
        {
            var products = await _productRepository.GetProductsByUserIdAsync(userId);
            var productDtos = new List<ProductDto>();

            foreach (var product in products)
            {
                productDtos.Add(new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    CategoryId = product.CategoryId,
                    ImageBase64 = Convert.ToBase64String(product.Image.ImageData)
                });
            }

            return productDtos;
        }
        public async Task PublishProduct(ProductFormDto productFormDto, string userId)
        {
            var product = new Product
            {
                Name = productFormDto.Name,
                Description = productFormDto.Description,
                Price = productFormDto.Price,
                Quantity = productFormDto.Quantity,
                CategoryId = productFormDto.CategoryId,
                Vat = 19,
                UserId = userId,
                ImageId = (await _imageService.CreateImage(productFormDto.Image)).ImageId
            };

            await _productRepository.AddProductAsync(product);
        }

        public async Task UpdateProduct(int productId, ProductFormDto productFormDto, string userId)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);
            if(product == null)
            {
                throw new Exception("Product not found.");
            }

            if(product.UserId != userId)
            {
                throw new Exception("You are not allowed to update this product.");
            }

            product.Name = productFormDto.Name;
            product.Description = productFormDto.Description;
            product.Price = productFormDto.Price;
            product.Quantity = productFormDto.Quantity;
            product.CategoryId = productFormDto.CategoryId;
            product.ImageId = (await _imageService.CreateImage(productFormDto.Image)).ImageId;

            await _productRepository.UpdateProductAsync(product);
        }

        public async Task DeleteProduct(int productId)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);
            if(product == null)
            {
                throw new Exception("Product not found.");
            }
            await _productRepository.DeleteProductAsync(product);

        }
    }
}
