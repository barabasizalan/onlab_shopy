using ShopyBackend.BLL_Domain_.Entities;

namespace ShopyBackend.BLL_Domain_.Services
{
    public interface IImageService
    {
        Task<Image> CreateImage(string imageDataBase64);
    }
}
