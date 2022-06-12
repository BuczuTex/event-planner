using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using PlanistaAPI.DataLayer;

namespace PlanistaAPI.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController: ControllerBase {
        private readonly PlanistaDbContext _context;
        private readonly UserManager<User> _userManager;

        public CompaniesController(PlanistaDbContext context, UserManager<User> userManager) {
            this._context = context;
            this._userManager = userManager;
        }

        // POST: api/Companies
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany([FromBody]CompanyRequest company) {
            Address address = _context.Addresses.FirstOrDefault(ad => ad.Id == company.addressId);
            User user = await _userManager.FindByIdAsync(company.userId);

            Company companyObj = new Company {
                Name = company.name,
                Description = company.description,
                Nip = company.nip,
                UserId = new Guid(company.userId),
                AddressId = company.addressId,
                User = user,
                Address = address
            };

            _context.Companies.Add(companyObj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostCompany", new {id = companyObj.Id}, companyObj);
        }
        //GET: api/Companies
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies() {
            return await _context.Companies.Include(x => x.Address)
                                           .Include(x => x.Events)
                                           .Include(x => x.Errands)
                                           .Include(x => x.Opinions)
                                           .ThenInclude(x => x.User)
                                           .ToListAsync();
        }
        //GET: api/Companies/{id}/Errands
        [HttpGet("{id}/Errands")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ICollection<Errand>> GetErrands(int id) {
            return await this._context.Companies.Where(x => x.Id == id)
                                                .Select(x => x.Errands)
                                                .FirstOrDefaultAsync();
        }
        // GET: api/Companies/{id}/Errands/Proposals
        [HttpGet("{id}/Errands/Proposals")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ICollection<Errand>> GetCompanyProposals(int id) {
            return await this._context.Errands.Where(x => x.CompanyId == id && x.EventId == 0)
                                              .Include(x => x.Category)
                                              .ToListAsync();
        }
    }
}