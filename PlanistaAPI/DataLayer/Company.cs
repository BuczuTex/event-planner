using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer
{
    public class Company
    {
        public int Id { get; set; }
        [Required, MaxLength(10)]
        public string Nip { get; set; }
        [Required, MaxLength(150)]
        public string Name { get; set; } = null!;
        [Required, MaxLength(1000)]
        public string Description { get; set; } = null!;

        public Guid UserId { get; set; }
        public int AddressId { get; set; }

        public User User { get; set; }
        public Address Address { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Errand> Errands { get; set; }
        public ICollection<Opinion> Opinions { get; set; }
    }
}
