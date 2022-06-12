namespace PlanistaAPI.Requests {
    public record NoteRequest(string title, string contents, int eventId);
}