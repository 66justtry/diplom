using diplom.Models;

namespace diplom.Repositories
{
    public class StorageRepository : IStorageRepository
    {
        DiplomDbContext _context;
        public StorageRepository(DiplomDbContext context)
        {
            _context = context;
        }
        public TaskSheet CreateTask()
        {
            _context.TaskSheets.Add(new TaskSheet());
            _context.SaveChanges();
            var task = _context.TaskSheets.OrderByDescending(t => t.Id).FirstOrDefault();
            if (task != null)
            {
                task.Url = $"task{task.Id}.jpg";
            }
            return task;
        }

        public TestSheet CreateTest()
        {
            _context.TestSheets.Add(new TestSheet());
            _context.SaveChanges();
            var test = _context.TestSheets.OrderByDescending(t => t.Id).FirstOrDefault();
            if (test != null)
            {
                test.Url = $"test{test.Id}.jpg";
            }
            return test;
        }
    }
}
