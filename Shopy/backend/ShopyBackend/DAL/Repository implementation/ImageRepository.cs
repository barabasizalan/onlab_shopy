using ShopyBackend.BLL_Domain_.Entities;
using ShopyBackend.BLL_Domain_.Repository_interfaces;
using ShopyBackend.DAL.DbContext;
using System.Reflection.Metadata.Ecma335;

namespace ShopyBackend.DAL.Repository_implementation
{
    public class ImageRepository: IImageRepository
    {
        private readonly ShopyDbContext _context;

        public ImageRepository(ShopyDbContext context)
        {
            _context = context;
        }

        public async Task<bool> InsertImage(Image image)
        {
            await _context.Images.AddAsync(image);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
