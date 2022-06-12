using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer
{
    public class Opinion
    {
        public int Id { get; set; }
        [Required, MaxLength(500)]
        public string Contents { get; set; }
        public DateTime AddDate {get; set; }

        public Company Company { get; set; }
        public User User { get; set; }

        public int CompanyId { get; set; }
        public Guid UserId { get; set; }
    }
}
