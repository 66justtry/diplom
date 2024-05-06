using diplom.Models;

namespace diplom.Repositories
{
    public interface IStorageRepository
    {
        TaskSheet CreateTask();
        TestSheet CreateTest();
    }
}
