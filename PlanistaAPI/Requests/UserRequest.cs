namespace PlanistaAPI.Requests {
    public record UserRequest(
        string firstName,
        string lastName,
        bool userActive,
        bool lockoutEnabled,
        string email,
        string role   
    );
}