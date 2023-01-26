using Microsoft.AspNetCore.Mvc;

namespace TodosWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<User>> RegisterUser(UserDto request)
        {
            var response = await _authService.RegisterUser(request);
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserDto request)
        {
            var response = await _authService.Login(request);
            if(response.Success)
                return Ok(response);

            return BadRequest(response.Message);
        }
    }
}
