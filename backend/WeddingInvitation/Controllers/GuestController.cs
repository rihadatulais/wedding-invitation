using Microsoft.AspNetCore.Mvc;
using WeddingInvitation.Services;

namespace WeddingInvitation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GuestController(GuestService guestService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetGuests()
    {
        return Ok(guestService.GetGuests());
    }

    [HttpGet("{slug}")]
    public IActionResult GetGuestBySlug(string slug)
    {
        var guest = guestService.GetGuestBySlug(slug);

        return guest is null ? NotFound() : Ok(guest);
    }
}
