using BLL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Repositories
{
    public interface IStatusRepository
    {
        Task<Status> GetStatusByIdAsync(int statusId);
        Task<Status> GetStatusByNameAsync(string statusName);
    }
}
