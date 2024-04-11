using ShopyBackend.DAL.Entities;

namespace ShopyBackend.BLL_Domain_.Repository_interfaces
{
    public interface IStatusRepository
    {
        Task<Status> GetStatusByIdAsync(int statusId);
        Task<Status> GetStatusByNameAsync(string statusName);
    }
}
