using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer
{
    public class Note
    {
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Title { get; set; }
        [Required, MaxLength(500)]
        public string Contents { get; set; }

        public Event Event { get; set; }
        public int EventId { get; set; }
    }
}
