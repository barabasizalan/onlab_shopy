using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL.Entities;

namespace ShopyBackend.BLL_Domain_.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _categoryRepository.GetAllCategoriesAsync();
        }
    }
}
