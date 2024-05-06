using diplom.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace diplom.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    [Authorize]
    public class TaskSheetController : ControllerBase
    {
        IStorageService _storageService;
        public TaskSheetController(IStorageService storageService)
        {
            _storageService = storageService;
        }
        [HttpPost]
        public IActionResult PostTask([FromBody] byte[] image)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest();
            }
            var res = _storageService.SaveTask(image);
            if (!res)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
