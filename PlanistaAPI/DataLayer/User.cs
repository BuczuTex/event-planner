using Microsoft.AspNetCore.Identity;

using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer
{
    public class User : IdentityUser<Guid>
    {
        public DateTime DateJoined { get; set; } = DateTime.Now;
        [Required, MaxLength(50)]
        public string FirstName { get; set; }
        [Required, MaxLength(50)]
        public string LastName { get; set; }
        public bool UserActive { get; set; }
        public string Role { get; set; }
        [Required, MaxLength(256)]
        public override string Email { get; set; }
        public override string NormalizedEmail { get => Email.ToUpperInvariant(); }
        public override string NormalizedUserName { get => UserName.ToUpperInvariant(); }
        public ICollection<Company> Companies { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Opinion> Opinions { get; set; }

        public User(string userName, string email, string firstName, string lastName) {
            Id = Guid.NewGuid();
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            UserName = userName;
        }
        public User() {}
    }
}
