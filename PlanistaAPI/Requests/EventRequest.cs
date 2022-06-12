using PlanistaAPI.DataLayer;

namespace PlanistaAPI.Requests {
    public record EventRequest(string name, string description, DateTime date, Address address, Guid userId, Category category);
}