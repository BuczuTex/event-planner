using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer
{
    public enum StateEnum {
        WAITING_FOR_COMPANY = 0,
        WAITING_FOR_ADMIN = 1,
        ACCEPTED = 2,
        FINISHED = 3,
        DELETED = 4,
        RATED = 5,
        ADDED_BY_COMPANY = 6,
};
    public class Errand
    {
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Title { get; set; }
        [Required, MaxLength(100)]
        public string Description { get; set; }
        public StateEnum State { get; set; } = StateEnum.WAITING_FOR_COMPANY;
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public Errand() {}
    }
}
