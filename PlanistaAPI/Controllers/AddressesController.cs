using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using PlanistaAPI.DataLayer;
using PlanistaAPI.Requests;

namespace PlanistaAPI.Controllers {
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class AddressesController : ControllerBase {
        private readonly PlanistaDbContext _context;

        public AddressesController(PlanistaDbContext context) {
            this._context = context;
        }

        //POST: api/Addresses
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<Address>> PostAddress([FromBody]Address address) {
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction("GetAddress", new {id = address.Id}, address);
        }

        // GET: api/Addresses/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(int id)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }
        // PUT: api/Addresses/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Address>> PutAddress([FromBody]AddressRequest request, int id) {
            var addressObj = await this._context.Addresses.FirstOrDefaultAsync(x => x.Id == id);

            if(addressObj == null) {
                return NotFound();
            }

            addressObj.BuildingNumber = request.buildingNumber;
            addressObj.City = request.city;
            addressObj.FlatNumber = request.flatNumber;
            addressObj.Street = request.street;
            addressObj.ZipCode = request.zipCode;

            this._context.Entry(addressObj).State = EntityState.Modified;
            await this._context.SaveChangesAsync();

            return Ok(addressObj);
        }
    }
}