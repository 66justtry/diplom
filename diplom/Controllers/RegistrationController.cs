using diplom.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace diplom.Controllers
{
    [Route("api/register")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IUserService _userService;

        public RegistrationController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IUserService userService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> TryRegister([FromBody] RegistrationData data)
        {
            if (data == null)
            {
                return BadRequest();
            }
            var result = await _userManager.CreateAsync(new IdentityUser(data.Email), data.Password);
            if (result != null && result.Succeeded)
            {
                var signIn = await _signInManager.PasswordSignInAsync(data.Email, data.Password, true, false);
                if (signIn != null && signIn.Succeeded)
                {
                    var isCreated = data.IsStudent ? _userService.CreateStudent(data.Name, data.Email, data.Password, data.IdGroup) : _userService.CreateTeacher(data.Name, data.Email, data.Password);

                    if (isCreated)
                        return Ok();
                }
            }
            return BadRequest();
        }

        public class RegistrationData
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public bool IsStudent { get; set; } = true;
            public int IdGroup { get; set; }
        }
    }
}
