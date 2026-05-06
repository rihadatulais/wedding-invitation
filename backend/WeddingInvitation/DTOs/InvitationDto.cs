namespace WeddingInvitation.DTOs;

public class InvitationDto
{
    public string CoupleName { get; set; } = string.Empty;
    public string BridePhoto { get; set; } = string.Empty;
    public string GroomPhoto { get; set; } = string.Empty;
    public string WeddingDate { get; set; } = string.Empty;
    public string WeddingTime { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public string TemplateCode { get; set; } = string.Empty;
    public string GuestName { get; set; } = string.Empty;
    public IReadOnlyCollection<OurStoryDto> OurStory { get; set; } = [];
}

public class OurStoryDto
{
    public string Year { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
