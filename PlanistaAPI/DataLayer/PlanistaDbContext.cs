using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace PlanistaAPI.DataLayer
{
    public class PlanistaDbContext : DbContext
    {
        public PlanistaDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Opinion> Opinions { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Errand> Errands { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<IdentityRole<Guid>> Roles { get; set; }
        public DbSet<IdentityUserRole<Guid>> IURoles { get; set; }
        public DbSet<ToDoListItem> ToDoListItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(
                assembly: typeof(PlanistaDbContext).Assembly
            );
            modelBuilder.Entity<User>().ToTable("users")
                                       .Ignore(x => x.ConcurrencyStamp)
                                       .Ignore(x => x.AccessFailedCount)
                                       .Ignore(x => x.PhoneNumber)
                                       .Ignore(x => x.PhoneNumberConfirmed)
                                       .Ignore(x => x.TwoFactorEnabled)
                                       .Ignore(x => x.SecurityStamp)
                                       .Ignore(x => x.LockoutEnd)
                                       .Ignore(x => x.EmailConfirmed);

            modelBuilder.Entity<Company>().HasMany(x => x.Events)
                                          .WithMany(x => x.Companies)
                                          .UsingEntity<Errand>();
            
            modelBuilder.Entity<IdentityUserRole<Guid>>().HasKey(x => new { x.RoleId, x.UserId});
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configurationRoot = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseMySql(configurationRoot.GetConnectionString("DefaultConnection"),
                ServerVersion.AutoDetect(configurationRoot.GetConnectionString("DefaultConnection")))
                .UseLoggerFactory(LoggerFactory.Create(b => b 
                .AddConsole()
                .AddFilter(level => level >= LogLevel.Information)))
                .EnableSensitiveDataLogging()
                .UseSnakeCaseNamingConvention();
        }
    }
}
