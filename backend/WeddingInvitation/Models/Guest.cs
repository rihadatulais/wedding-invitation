namespace WeddingInvitation.Models;

public class Guest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public bool HasAttended { get; set; }
}
