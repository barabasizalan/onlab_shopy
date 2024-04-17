using BLL.Entities;
using BLL.Repositories;
using DAL.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class PaymentMethodRepository : IPaymentMethodRepository
    {
        private readonly ShopyDbContext _context;

        public PaymentMethodRepository(ShopyDbContext context)
        {
            _context = context;
        }
        public async Task<PaymentMethod> GetPaymentMethodByIdAsync(int id)
        {
            var method = await _context.PaymentMethods.FindAsync(id);
            if(method != null)
            {
                return method;
            }
            else
            {
                throw new Exception("Payment method not found.");
            }
        }
    }
}
