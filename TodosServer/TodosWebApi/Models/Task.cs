using System.ComponentModel.DataAnnotations.Schema;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace TodosWebApi.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Subject { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }

        [ForeignKey("User")]
        public int? UserId { get; set; }
        public User User { get; set; }
    }
}
