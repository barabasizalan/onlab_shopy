using BLL.DTO;
using BLL.Entities;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;
        
        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult> CreateAddress([FromBody] AddressRequestDto addressRequestDto)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var newAddress = await _addressService.CreateAddress(addressRequestDto);

                if (newAddress == null)
                    return BadRequest("Address could not be created.");

                await _addressService.AddAddressToUser(userId, newAddress.Id);

                return Ok(newAddress);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("my")]
        public async Task<ActionResult<Address>> GetMyAddress()
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var address = await _addressService.GetAddressByUserId(userId);
                if (address == null){
                    return NotFound("Address not found.");
                }

                return Ok(address);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateAddress([FromBody] AddressRequestDto addressRequestDto)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var address = await _addressService.GetAddressByUserId(userId);

                await _addressService.UpdateAddress(address.Id, addressRequestDto);

                return Ok("Address updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
