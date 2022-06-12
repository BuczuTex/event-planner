using System.ComponentModel.DataAnnotations;

namespace PlanistaAPI.DataLayer
{
    public class Address
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Street { get; set; }
        [Required]
        public int BuildingNumber { get; set; }
        public int? FlatNumber { get; set; }
        [Required, MaxLength(100)]
        public string City { get; set; }
        [Required, MaxLength(6)]
        public string ZipCode { get; set; }

        public Address(string street, int buildingNumber, string city, string zipCode) {
            Street = street;
            BuildingNumber = buildingNumber;
            City = city;
            ZipCode = zipCode;
        }
        public virtual ICollection<Event> Events { get; set; }
    }
}
