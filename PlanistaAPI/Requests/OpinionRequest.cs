namespace PlanistaAPI.Requests {
    public record OpinionRequest(int? id, string contents, DateTime addDate, int companyId, string userId);
}