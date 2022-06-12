using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using PlanistaAPI.DataLayer;
using PlanistaAPI.Requests;

namespace PlanistaAPI.Controllers {
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(Roles = "Administrator, User", AuthenticationSchemes = "Bearer")]
    [ApiController]
    public class ToDoListItemsController: ControllerBase {
        public PlanistaDbContext _context;

        public ToDoListItemsController(PlanistaDbContext context) {
            this._context = context;
        }

        // Route: api/ToDoListItems
        [HttpGet]
        public async Task<ActionResult<ICollection<ToDoListItem>>> GetToDoListItems() {
            return await this._context.ToDoListItems.Include(x => x.Event)
                                                    .Include(x => x.Category)
                                                    .ToListAsync();
        }
        // Route: api/ToDoListItems/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoListItem>> GetToDoListItem(int id) {
            return await this._context.ToDoListItems.Where(x => x.Id == id).FirstOrDefaultAsync();
        }
        // Route: api/ToDoListItems
        [HttpPost]
        public async Task<ActionResult<ToDoListItem>> PostToDoListItem([FromBody]ToDoListItemRequest request) {
            Event @event = await _context.Events.FirstOrDefaultAsync(x => x.Id == request.eventId);

            ToDoListItem toDoListItem = new ToDoListItem {
                Title = request.title,
                Description = request.description,
                Event = @event,
                EventId = request.eventId,
                State = (StateEnum)request.state,
                CategoryId = request.category.Id
            };

            _context.ToDoListItems.Add(toDoListItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetToDoListItem", new { id = toDoListItem.Id}, toDoListItem);        
        }
        // Route: api/ToDoListItems/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteToDoItem(int id) {
            var toDoItem = await this._context.ToDoListItems.FirstOrDefaultAsync(x => x.Id == id);

            if(toDoItem == null) {
                return NoContent();
            }

            toDoItem.State = StateEnum.DELETED;

            _context.SaveChanges();

            return Ok();
        }
        // PUT: api/ToDoListItems/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<ToDoListItem>> PutToDoListItem([FromBody]ToDoListItemRequest item, int id) {
            var toDoItem = await this._context.ToDoListItems.Include(x => x.Event)
                                                            .Include(x => x.Category)
                                                            .FirstOrDefaultAsync(x => x.Id == id);

            if(toDoItem == null) {
                return NoContent();
            }

            var @event = await this._context.Events.FirstOrDefaultAsync(x => x.Id == item.eventId);

            toDoItem.Title = item.title;
            toDoItem.Description = item.description;
            toDoItem.State = (StateEnum)item.state;

            toDoItem.CategoryId = item.categoryId;
            toDoItem.EventId = item.eventId;

            _context.Entry(toDoItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(toDoItem);
        }
    }
}