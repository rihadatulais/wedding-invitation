using WeddingInvitation.DTOs;

namespace WeddingInvitation.Services;

public class InvitationService
{
    public InvitationDto GetInvitation(string guestSlug)
    {
        var guestName = string.IsNullOrWhiteSpace(guestSlug)
            ? "Nama Tamu"
            : guestSlug.Replace("-", " ").Trim();

        guestName = string.Join(
            " ",
            guestName.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Select(word => char.ToUpperInvariant(word[0]) + word[1..].ToLowerInvariant()));

        return new InvitationDto
        {
            CoupleName = "Caca & Reza",
            BridePhoto = "/photos/bride.jpg",
            GroomPhoto = "/photos/groom.jpg",
            WeddingDate = "2025-06-28",
            WeddingTime = "10:00 WIB",
            Venue = "Grand Ballroom Hotel Mulia, Jakarta",
            TemplateCode = "template-one",
            GuestName = guestName,
            OurStory =
            [
                new OurStoryDto
                {
                    Year = "2020",
                    Title = "Pertama Bertemu",
                    Description = "Kami pertama kali bertemu di sebuah acara..."
                },
                new OurStoryDto
                {
                    Year = "2022",
                    Title = "Mulai Bersama",
                    Description = "Setelah dua tahun persahabatan..."
                },
                new OurStoryDto
                {
                    Year = "2025",
                    Title = "Lamaran",
                    Description = "Di momen yang tak terlupakan..."
                }
            ]
        };
    }
}
