using Task = TodosWebApi.Models.Task;

namespace TodosWebApi.Services.AuthService
{
    public interface ITaskService
    {
        Task<List<Task>> GetByUserId(int id);
        Task<Task> Add(TaskDto request);
        Task<Task?> Delete(int id);
        Task<Task?> Update(TaskDto request);
    }
}