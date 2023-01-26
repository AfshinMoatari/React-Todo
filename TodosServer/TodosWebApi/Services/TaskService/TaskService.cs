using Microsoft.AspNetCore.Identity;
using Task = TodosWebApi.Models.Task;

namespace TodosWebApi.Services.TaskService
{
    public class TaskService : ITaskService
    {
        private readonly DataContext _context;

        public TaskService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Task>> GetByUserId(int id)
        {
            return await _context.Tasks
                .Where(x => x.UserId == id)
                .ToListAsync();
        }

        public async Task<Task> Add(TaskDto request)
        {
            var task = new Task
            {
                Subject = request.Subject,
                UserId = request.UserId,
                CreationDate = DateTime.Now
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<Task?> Delete(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
                return task;
            }
            return null;
        }

        public async Task<Task?> Update(TaskDto request)
        {
           var task = await _context.Tasks
                .Where(x => x.Id == request.Id)
                .FirstOrDefaultAsync();
            if (task != null)
            {
                task.Subject = request.Subject;
                _context.Tasks.Attach(task);
                await _context.SaveChangesAsync();
                return task;
            }
            return null;
        }
    }
}
