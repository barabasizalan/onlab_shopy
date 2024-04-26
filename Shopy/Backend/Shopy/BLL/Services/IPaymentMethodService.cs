using BLL.DTO;
using BLL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IPaymentMethodService
    {
        Task<IEnumerable<PaymentMethodDto>> GetAllPaymentMethods();
    }
}
