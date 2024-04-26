using Microsoft.AspNetCore.Mvc;
using BLL.Services;
using BLL.DTO;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaymentMethodController : ControllerBase
    {
        private readonly IPaymentMethodService _paymentMethodService;

        public PaymentMethodController(IPaymentMethodService paymentMethodService)
        {
            _paymentMethodService = paymentMethodService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IEnumerable<PaymentMethodDto>>> GetPaymentMethods()
        {
            try
            {
                var paymentMethods = await _paymentMethodService.GetAllPaymentMethods();
                return Ok(paymentMethods);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
