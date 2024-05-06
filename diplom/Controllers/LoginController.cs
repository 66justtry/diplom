using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace diplom.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly SignInManager<IdentityUser> _signInManager;
        public LoginController(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> TryLogin([FromBody] LoginData data)
        {
            if (data == null)
            {
                return BadRequest();
            }
            var result = await _signInManager.PasswordSignInAsync(data.Email, data.Password, true, false);
            if (result.Succeeded)
            {

                return Ok();
            }
            return BadRequest();
        }

        public class LoginData
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
