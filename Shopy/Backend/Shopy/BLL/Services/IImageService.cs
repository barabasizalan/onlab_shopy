using BLL.Entities;

namespace BLL.Services
{
    public interface IImageService
    {
        Task<Image> CreateImage(string imageDataBase64);
    }
}
