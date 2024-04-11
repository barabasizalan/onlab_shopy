using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL.DbContext;
using ShopyBackend.DAL.Entities;

namespace ShopyBackend.DAL.Repository_implementation
{
    public class CategoryRepository: ICategoryRepository
    {
        private readonly ShopyDbContext _context;

        public CategoryRepository(ShopyDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}
