namespace PlanistaAPI.DataLayer {
    public record ErrandRequest(string title, string description, StateEnum state, int companyId, int eventId, Category category);
}