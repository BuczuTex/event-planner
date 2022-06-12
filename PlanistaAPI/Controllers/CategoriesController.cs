using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using PlanistaAPI.DataLayer;

namespace PlanistaAPI.Controllers{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class CategoriesController: ControllerBase {
        private readonly PlanistaDbContext _context;
        public CategoriesController(PlanistaDbContext context) {
            _context = context;
        }

        //GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }
        //GET: api/Categories/{Id}
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory(int id) {
            return await _context.Categories.Where(category => category.Id == id).ToListAsync();
        }
    }
}