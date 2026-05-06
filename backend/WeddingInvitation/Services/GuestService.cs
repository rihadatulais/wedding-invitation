using WeddingInvitation.Models;

namespace WeddingInvitation.Services;

public class GuestService
{
    private static readonly List<Guest> Guests =
    [
        new Guest { Id = 1, Name = "Nama Tamu", Slug = "nama-tamu", HasAttended = false },
        new Guest { Id = 2, Name = "Bapak Ahmad", Slug = "bapak-ahmad", HasAttended = false },
        new Guest { Id = 3, Name = "Ibu Sari", Slug = "ibu-sari", HasAttended = true }
    ];

    public IReadOnlyCollection<Guest> GetGuests() => Guests.AsReadOnly();

    public Guest? GetGuestBySlug(string slug)
    {
        return Guests.FirstOrDefault(guest =>
            string.Equals(guest.Slug, slug, StringComparison.OrdinalIgnoreCase));
    }
}
