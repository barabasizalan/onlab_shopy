using BLL.DTO;
using BLL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class PaymentMethodService : IPaymentMethodService
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public PaymentMethodService(IPaymentMethodRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }

        public async Task<IEnumerable<PaymentMethodDto>> GetAllPaymentMethods()
        {
            var paymentMethods = await _paymentMethodRepository.GetAllPaymentMethodsAsync();
            return paymentMethods.Select(x => new PaymentMethodDto
            {
                Id = x.Id,
                Method = x.Method
            });
        }
    }
}
