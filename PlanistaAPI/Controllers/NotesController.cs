using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using PlanistaAPI.DataLayer;
using PlanistaAPI.Requests;
using PlanistaAPI.Managers;

namespace PlanistaAPI.Controllers {
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    [Authorize(Roles = "Administrator, User", AuthenticationSchemes = "Bearer")]
    public class NotesController: ControllerBase {
        private PlanistaDbContext _context;
        
        public NotesController(PlanistaDbContext context) {
            this._context = context;
        }

        // Route: api/Notes
        [HttpGet]
        public async Task<ICollection<Note>> getNotes() {
            return await this._context.Notes.ToListAsync();
        }
        // Route: api/Notes/{id}
        [HttpGet("{id}")]
        public async Task<Note> getNote(int id) {
            return await this._context.Notes.FirstOrDefaultAsync(x => x.Id == id);
        }
        // Route: api/Notes
        [HttpPost]
        public async Task<ActionResult<Note>> postNote([FromBody]NoteRequest note) {
            Event @event = await this._context.Events.Where(x => x.Id == note.eventId).FirstOrDefaultAsync();

            Note noteObj = new Note {
                Title = note.title,
                Contents = note.contents,
                EventId = note.eventId,
                Event = @event
            };

            _context.Notes.Add(noteObj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("getNote", new { id = noteObj.Id}, noteObj);
        }
        // Route: api/Notes/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteNote(int id) {
            var note = await this._context.Notes.FirstOrDefaultAsync(x => x.Id == id);

            if(note == null) {
                return NoContent();
            }

            this._context.Entry(note).State = EntityState.Deleted;
            await this._context.SaveChangesAsync();

            return Ok();
        }
    }
}