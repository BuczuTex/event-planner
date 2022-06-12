namespace PlanistaAPI.DataLayer {
    public record CompanyRequest(string name, string description, string userId, string nip, int views, int addressId);
}