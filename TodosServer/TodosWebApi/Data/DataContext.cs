using Task = TodosWebApi.Models.Task;

namespace TodosWebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Task> Tasks => Set<Task>();
    }
}
