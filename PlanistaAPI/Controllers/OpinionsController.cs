using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using PlanistaAPI.DataLayer;
using PlanistaAPI.Requests;

namespace PlanistaAPI.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class OpinionsController : ControllerBase {
        PlanistaDbContext _context;

        public OpinionsController(PlanistaDbContext context) {
            this._context = context;
        }

        // GET: api/Opinions
        [HttpGet]
        public async Task<ICollection<Opinion>> GetOpinions() {
            return await this._context.Opinions.Include(x => x.Company)
                                               .Include(x => x.User)
                                               .ToListAsync();
        }
        // GET: api/Opinions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Opinion>> GetOpinion(int id) {
            var opinion = await this._context.Opinions.FirstOrDefaultAsync(x => x.Id == id);

            if(opinion == null) {
                return NotFound();
            }

            return Ok(opinion);
        }
        // DELETE: api/Opinions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOpinion(int id) {
            var opinion = await this._context.Opinions.FirstOrDefaultAsync(x => x.Id == id);

            if(opinion == null) {
                return NotFound();
            }

            this._context.Entry(opinion).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();

            return Ok();
        }
        // POST: api/Opinions
        [HttpPost]
        public async Task<ActionResult> PostOpinion([FromBody]OpinionRequest request) {
            var company = await this._context.Companies.FirstOrDefaultAsync(x => x.Id == request.companyId);
            var user = await this._context.Users.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(request.userId)));

            Opinion opinion = new Opinion {
                Contents = request.contents,
                AddDate = request.addDate,
                Company = company,
                User = user,
            };

            this._context.Opinions.Add(opinion);
            await this._context.SaveChangesAsync();

            return CreatedAtAction("GetOpinion", new { id = opinion.Id}, opinion);
        }
    }
}