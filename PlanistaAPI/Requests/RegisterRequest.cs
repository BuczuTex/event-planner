namespace PlanistaAPI.Requests {
    public record RegisterRequest (
        string userName, 
        string password, 
        string email,
        string firstName,
        string lastName,
        bool lockoutEnabled,
        bool userActive, 
        string role
    );
}