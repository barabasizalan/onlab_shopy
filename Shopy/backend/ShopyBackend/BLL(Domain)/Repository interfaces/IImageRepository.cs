using ShopyBackend.BLL_Domain_.Entities;

namespace ShopyBackend.BLL_Domain_.Repository_interfaces
{
    public interface IImageRepository
    {
        Task<bool> InsertImage(Image image);
    }
}
