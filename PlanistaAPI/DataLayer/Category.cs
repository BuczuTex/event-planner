using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer
{
    public class Category
    {
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Name { get; set; }

        public Category(string name) {
            Name = name;
        }
        public ICollection<Event> Events { get; set; }
        public ICollection<ToDoListItem> ToDoListItems { get; set; }
        public ICollection<Errand> Errands { get; set; }
    }
}
