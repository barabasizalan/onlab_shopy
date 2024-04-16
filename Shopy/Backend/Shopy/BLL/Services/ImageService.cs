using BLL.Entities;
using BLL.Repositories;
using System.Text;

namespace BLL.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;

        public ImageService(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }
        public async Task<Image> CreateImage(string imageDataBase64)
        {
            if(imageDataBase64 == null)
            {
                return null;
            }
            Image image = new Image();

            byte[] arrayFromString = Encoding.ASCII.GetBytes(imageDataBase64);

            image.ImageData = arrayFromString;

            if(image.ImageData == null)
            {
                return null;
            }

            return await _imageRepository.InsertImage(image) ? image : null;
        }
    }
}
