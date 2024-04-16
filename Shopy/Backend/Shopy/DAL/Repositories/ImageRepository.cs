using BLL.Entities;
using BLL.Repositories;
using DAL.DbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class ImageRepository : IImageRepository
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
