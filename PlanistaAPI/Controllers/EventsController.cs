#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using PlanistaAPI.DataLayer;
using PlanistaAPI.Requests;
using PlanistaAPI.Managers;

namespace PlanistaAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly PlanistaDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public EventsController(PlanistaDbContext context, IHttpContextAccessor httpContextAccessor,
        UserManager<User> userManager)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<IEnumerable<Event>> GetEvents()
        {
            var events = await _context.Events.Include(e => e.Address)
                                              .Include(e => e.Category)
                                              .Include(e => e.User)
                                              .Include(e => e.ToDoListItems)
                                              .Include(e => e.Notes)
                                              .Include(e => e.Companies)
                                              .ToListAsync();

            return events;
        }

        // GET: api/Events/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            string role = TokenManager.GetRoleFromToken(Request.Headers["Authentication"]);
            var userId = TokenManager.GetUserIdFromToken(Request.Headers["Authentication"]);
            var @event = await _context.Events.Include(e => e.Address)
                                              .Include(e => e.Category)
                                              .Include(e => e.User)
                                              .Include(e => e.Companies)
                                              .Include(e => e.ToDoListItems)
                                              .Include(e => e.Notes)
                                              .FirstOrDefaultAsync(e => e.Id == id);

            if(!(@event.UserId.Equals(Guid.Parse(userId)) || role.Equals("Administrator"))) {
                return NotFound();
            }

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }
        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent([FromBody]EventRequest @event)
        {
            Category category = _context.Categories.FirstOrDefault(x => x.Equals(@event.category));
            Address address = _context.Addresses.FirstOrDefault(x => x.Street.Equals(@event.address.Street) && x.BuildingNumber.Equals(@event.address.BuildingNumber) && 
            x.City.Equals(@event.address.City) && x.FlatNumber.Equals(@event.address.FlatNumber) && x.ZipCode.Equals(@event.address.ZipCode));
            User user = await _userManager.FindByIdAsync(@event.userId.ToString());

            Event eventObj = new Event { 
                Name = @event.name, 
                Description = @event.description, 
                Date = @event.date,
                Category = category,
                CategoryId = category.Id,
                Address = address,
                AddressId = address.Id,
                User = user,
                UserId = user.Id
            };

            _context.Events.Add(eventObj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new {id = eventObj.Id}, eventObj);
        }

        //GET: api/Events/{id}/Errands
        [Route("{id}/Errands")]
        [HttpGet]
        public async Task<ICollection<Errand>> GetErrands(int id) {
            var errands = await _context.Errands.Include(x => x.Event)
                                                .Include(x => x.Company)
                                                .Where(x => x.EventId == id)
                                                .ToListAsync();
            
            return errands;
        }
        [HttpPut("{eventId}/Companies/{companyId}/Errands")]
        public async Task<ActionResult<Errand>> EditErrand([FromBody]ErrandRequest errand, int eventId, int companyId) {
            var errandObj = await this._context.Errands.FirstOrDefaultAsync(x => x.EventId == eventId && x.CompanyId == companyId);
            
            if(errandObj != null) {
                errandObj.CompanyId = errand.companyId;
                errandObj.EventId = errand.eventId;
                errandObj.State = errand.state;
                errandObj.Title = errand.title;
                errandObj.Description = errand.description;

                await this._context.SaveChangesAsync();
            }
            else {
                return NotFound();
            }

            return Ok(errandObj);
        }
        // Route: api/Events/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Event>> PutEvent([FromBody]EventRequest request, int id) {
            var eventObj = await this._context.Events.FirstOrDefaultAsync(x => x.Id == id);
            string role = TokenManager.GetRoleFromToken(Request.Headers["Authentication"]);
            var userId = TokenManager.GetUserIdFromToken(Request.Headers["Authentication"]);

            if(!(request.userId.Equals(Guid.Parse(userId)) || role.Equals("Administrator"))) {
                return BadRequest();
            }

            if(eventObj == null) {
                return NotFound();
            }

            eventObj.Name = request.name;
            eventObj.Description = request.description;
            eventObj.Date = request.date;
            eventObj.Category = request.category;

            this._context.Entry(eventObj).State = EntityState.Modified;
            this._context.SaveChanges();

            return Ok(eventObj);
        }
        // Route: api/Events/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int id) {
            var eventObj = await this._context.Events.FirstOrDefaultAsync(x => x.Id == id);

            if(eventObj == null) {
                return NoContent();
            }

            this._context.Entry(eventObj).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();

            return Ok();
        }
        // Route: Events/{id}/Recommend
        [HttpGet("{id}/Recommend")]
        public async Task<ActionResult> GroupToDoListItems(int id) {
            Event @event = await this._context.Events.FirstOrDefaultAsync(x => x.Id == id);

            var groupedItems = this._context.ToDoListItems.Where(x => x.CategoryId == @event.CategoryId && x.EventId != id && x.State == StateEnum.FINISHED)
                                                          .GroupBy(x => x.Title)
                                                          .Select(x => new {
                                                            Title = x.Key,
                                                            Count = x.Count()
                                                        });
            return Ok(groupedItems);
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}
