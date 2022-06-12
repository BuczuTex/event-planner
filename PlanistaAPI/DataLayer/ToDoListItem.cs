using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer {
    public class ToDoListItem {
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Title { get; set; }
        [Required, MaxLength(500)]
        public string Description { get; set; }
        public StateEnum State { get; set; } = StateEnum.WAITING_FOR_ADMIN;
        public Event Event { get; set; }
        public Category Category { get; set; }
        public int EventId { get; set; }
        public int CategoryId { get; set; }

    }
}