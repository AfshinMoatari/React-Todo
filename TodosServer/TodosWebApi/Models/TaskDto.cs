
namespace TodosWebApi.Models
{
    public class TaskDto
    {
        public int? Id { get; set; }
        public string Subject { get; set; } = string.Empty;
        public int? UserId { get; set; }
    }
}
