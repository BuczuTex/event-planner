using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using PlanistaAPI.DataLayer;

namespace PlanistaAPI.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ErrandsController: ControllerBase {
        private readonly PlanistaDbContext _context;

        public ErrandsController(PlanistaDbContext context) {
            this._context = context;
        }
        //GET: api/Errands
        [HttpGet]
        public async Task<IEnumerable<Errand>> GetErrands() {
            return await this._context.Errands.Include(x => x.Event)
                                              .Include(x => x.Company)
                                              .Include(x => x.Category)
                                              .ToListAsync();
        }
        //POST: api/Errands
        [HttpPost]
        public async Task<ActionResult<Errand>> PostErrand([FromBody]ErrandRequest errand) {
            var company = _context.Companies.FirstOrDefault(x => x.Id == errand.companyId);
            var @event = _context.Events.FirstOrDefault(x => x.Id == errand.eventId);
            Errand errandObj = new Errand {
                Company = company,
                Event = @event,
                Title = errand.title,
                Description = errand.description,
                State = errand.state,
                CategoryId = errand.category.Id,
            };

            _context.Errands.Add(errandObj);
            await _context.SaveChangesAsync();

            return Ok(errandObj);
        }
        // PUT: api/Errands/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Errand>> PutErrand([FromBody]ErrandRequest errand, int id) {
            var errandToChange = await _context.Errands.FirstOrDefaultAsync(x => x.Id == id);

            if(errandToChange == null) {
                return NotFound();
            }

            errandToChange.Title = errand.title;
            errandToChange.Description = errand.description;
            errandToChange.State = errand.state;

            this._context.Entry(errandToChange).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(errandToChange);
        }
        // DELETE: api/Errands/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteErrand(int id) {
            var errand = await _context.Errands.FirstOrDefaultAsync(x => x.Id == id);

            if(errand == null) {
                return NotFound();
            }

            _context.Entry(errand).State = EntityState.Deleted;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}