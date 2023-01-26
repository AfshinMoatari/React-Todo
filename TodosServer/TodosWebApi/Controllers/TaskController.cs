using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = TodosWebApi.Models.Task;

namespace TodosWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        [Route("TaskList")]
        public async Task<ActionResult<List<Task>>> Get(int id)
        {
            List<Task>? taskList = await _taskService.GetByUserId(id);
            if (taskList.Count() >= 0)
                return taskList;
            return Ok("No tasks found!");
        }

        [HttpPost]
        [Route("CreateTask")]
        public async Task<ActionResult<Task>> POST(TaskDto request)
        {
            return await _taskService.Add(request);
        }

        [HttpGet]
        [Route("DeleteTask")]
        public async Task<ActionResult<Task>> Delete(int id)
        {
            var res = await _taskService.Delete(id);
            if (res != null)
                return res;
            return Ok("Cannot Delete the task!");
        }

        [HttpPost]
        [Route("UpdateTask")]
        public async Task<ActionResult<Task>> Update(TaskDto request)
        {
            var res = await _taskService.Update(request);
            if (res != null)
                return res;
            return Ok("Cannot edit the task!");
        }
    }
}
