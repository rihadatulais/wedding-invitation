using Microsoft.AspNetCore.Mvc;
using WeddingInvitation.Services;

namespace WeddingInvitation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvitationController(InvitationService invitationService) : ControllerBase
{
    [HttpGet("{guestSlug}")]
    public IActionResult GetInvitation(string guestSlug)
    {
        var invitation = invitationService.GetInvitation(guestSlug);
        return Ok(invitation);
    }
}
