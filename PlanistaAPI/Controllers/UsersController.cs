using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

using PlanistaAPI.DataLayer;
using PlanistaAPI.Requests;

namespace PlanistaAPI.Controllers {
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class UsersController: ControllerBase {
        private PlanistaDbContext _context;
        private UserManager<User> _userManager;
        public UsersController(PlanistaDbContext context, UserManager<User> userManager) {
            this._context = context;
            this._userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> GetUsers() {
            var users = await this._context.Users.Include(x => x.Companies)
                                                 .Include(x => x.Events)
                                                 .ToListAsync();

            return Ok(users);                                                
        }
        // GET: Users/{userId}/Companies
        [HttpGet("{userId}/Companies")]
        [Authorize(Roles = "Administrator, User, CompanyUser")]
        public async Task<Company> GetCompanyByUserId(string userId) {
            var company = await _context.Companies.Include(x => x.Errands)
                                                  .FirstOrDefaultAsync(x => x.UserId.Equals(Guid.Parse(userId)));
            
            return company;
        }
        // GET: Users/{userId}/Events
        [HttpGet("{userId}/Events")]
        [Authorize(Roles = "Administrator, User")]
        public async Task<ActionResult> GetEventsByUserId(string userId) {
            var events = await this._context.Events.Include(x => x.Companies)
                                                   .Include(x => x.Errands)
                                                   .Where(x => x.UserId.Equals(Guid.Parse(userId)))
                                                   .ToListAsync();

            return Ok(events);
        }
        // PUT: Users/{userId}
        [HttpPut("{userId}")]
        public async Task<ActionResult<User>> PutUser([FromBody]UserRequest request, string userId) {
            var user = await this._context.Users.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(userId)));

            if(user == null) {
                return NotFound();
            }

            user.UserActive = request.userActive;
            user.Role = request.role;
            user.LockoutEnabled = request.lockoutEnabled;
            user.FirstName = request.firstName;
            user.LastName = request.lastName;
            user.Email = request.email;

            this._context.Entry(user).State = EntityState.Modified;
            await this._context.SaveChangesAsync();

            return Ok(user);
        }
    }
}