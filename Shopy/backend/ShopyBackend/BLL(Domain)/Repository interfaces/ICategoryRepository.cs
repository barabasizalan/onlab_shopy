using ShopyBackend.DAL.Entities;

namespace ShopyBackend.BLL_Domain_.Repository_interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
    }
}
