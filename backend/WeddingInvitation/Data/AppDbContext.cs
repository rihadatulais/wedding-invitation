using Microsoft.EntityFrameworkCore;
using WeddingInvitation.Models;

namespace WeddingInvitation.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Couple> Couples => Set<Couple>();
    public DbSet<Guest> Guests => Set<Guest>();
    public DbSet<OurStory> OurStories => Set<OurStory>();
    public DbSet<Template> Templates => Set<Template>();
}
