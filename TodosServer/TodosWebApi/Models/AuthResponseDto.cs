namespace TodosWebApi.Models
{
    public class AuthResponseDto
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; } = string.Empty;
        public string username { get; set; } = string.Empty;
        public int id { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime TokenExpires { get; set; }
    }
}
