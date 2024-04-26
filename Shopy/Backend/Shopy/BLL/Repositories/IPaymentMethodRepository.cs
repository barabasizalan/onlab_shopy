using BLL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Repositories
{
    public interface IPaymentMethodRepository
    {
        Task<PaymentMethod> GetPaymentMethodByIdAsync(int id);
        Task<IEnumerable<PaymentMethod>> GetAllPaymentMethodsAsync();
    }
}
