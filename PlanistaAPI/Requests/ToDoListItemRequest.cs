using PlanistaAPI.DataLayer;

namespace PlanistaAPI.Requests {
    public record ToDoListItemRequest(string title, string description, int eventId, int state, Category category, int categoryId);
}