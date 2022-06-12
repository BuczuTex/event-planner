using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

using PlanistaAPI.Requests;
using PlanistaAPI.DataLayer;
using PlanistaAPI.Managers;

namespace PlanistaAPI.Controllers {
    [Route("api/auth")]
    [Produces("application/json")]
    public class AuthController : ControllerBase {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        
        public AuthController(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager) {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }
        
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginRequest loginRequest) {
            var user = await _userManager.FindByNameAsync(loginRequest.UserName);
            var userRoles = await _userManager.GetRolesAsync(user);
            
            if(user != null && await _userManager.CheckPasswordAsync(user, loginRequest.Password)) {
                var token = TokenManager.GenerateJwtToken(user, (List<string>)userRoles);

                Response.Headers.Add("Authentication", token);

                return Ok(new { id = user.Id, userActive =  user.UserActive});
            }
            return Unauthorized();
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterRequest registerRequest) {      
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            User user = new User(registerRequest.userName, registerRequest.email, registerRequest.firstName, 
                                registerRequest.lastName);
            List<string> roles = await InitRoles();

            user.LockoutEnabled = registerRequest.lockoutEnabled;
            user.UserActive = registerRequest.userActive;
            
            IdentityResult isUserCreationSucceded = await _userManager.CreateAsync(user, registerRequest.password);
            if(!isUserCreationSucceded.Succeeded) {
                if(await _userManager.FindByEmailAsync(registerRequest.email) != null)
                    ModelState.AddModelError("emailAddress", "This e-mail address is already taken.");
                if(await _userManager.FindByNameAsync(registerRequest.userName) != null)
                    ModelState.AddModelError("userName", "This username is already taken.");

                return BadRequest(ModelState);
            }
            user.Role = string.Join(", ", roles.FindAll(x => x == registerRequest.role));
            await _userManager.AddToRolesAsync(user, roles.FindAll(x => x == registerRequest.role));

            return Ok(new { id = user.Id });
       }
        private async Task<List<string>> InitRoles() {
            bool isUserRoleCreated = await _roleManager.RoleExistsAsync("User");
            bool isCompanyUserRoleCreated = await _roleManager.RoleExistsAsync("CompanyUser");
            bool isAdminRoleCreated = await _roleManager.RoleExistsAsync("Administrator");
            List<string> roles = new List<string>();

            if(!isUserRoleCreated) {
                IdentityRole<Guid> userRole = new IdentityRole<Guid>("User");
                userRole.Id = Guid.NewGuid();

                await _roleManager.CreateAsync(userRole);
                roles.Add("User");
            }
            if(!isCompanyUserRoleCreated) {
                IdentityRole<Guid> companyUserRole = new IdentityRole<Guid>("CompanyUser");
                companyUserRole.Id = Guid.NewGuid();

                await _roleManager.CreateAsync(companyUserRole);
                roles.Add("User");
            }
            if(!isAdminRoleCreated) {
                IdentityRole<Guid> adminRole = new IdentityRole<Guid>("Administrator");
                adminRole.Id = Guid.NewGuid();

                await _roleManager.CreateAsync(adminRole);
                roles.Add("Administrator");
            }

            roles.Add("User");
            roles.Add("CompanyUser");
            roles.Add("Administrator");
            

            return roles;
       }
    }
}