namespace PlanistaAPI.Requests {
    public record AddressRequest(string street, int buildingNumber, int flatNumber, string city, string zipCode);
}