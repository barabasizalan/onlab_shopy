using ShopyBackend.DAL.Entities;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategories();
    }
}
