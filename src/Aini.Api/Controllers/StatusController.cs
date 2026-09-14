using Microsoft.AspNetCore.Mvc;

namespace Aini.Api.Controllers;

[ApiController]
[Route("api/status")]
public sealed class StatusController : ControllerBase
{
    [HttpGet]
    public ActionResult<StatusResponse> Get()
    {
        return Ok(new StatusResponse(
            "AINI API",
            "ready",
            DateTimeOffset.UtcNow));
    }
}

public sealed record StatusResponse(string Service, string Status, DateTimeOffset CheckedAtUtc);
