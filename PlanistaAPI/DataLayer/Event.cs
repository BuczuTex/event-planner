using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer
{
    public class Event
    {
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; } = null!;
        [Required, MaxLength(500)]
        public string Description { get; set; } = null!;
        [Required]
        public DateTime Date { get; set; }
        #nullable enable
        public int? CategoryId { get; set; }
        public int? AddressId { get; set; }
        public Guid? UserId { get; set; }
        public Category? Category { get; set; }
        public Address? Address { get; set; }
        public User? User { get; set; }
        #nullable disable

        public ICollection<Company> Companies { get; set; }
        public ICollection<Errand> Errands { get; set; }
        public ICollection<ToDoListItem> ToDoListItems { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
}
