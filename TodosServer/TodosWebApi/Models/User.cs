namespace TodosWebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }

        public ICollection<Task> Tasks { get; set; }
    }
}
