using diplom.Repositories;
using System.Linq.Expressions;

namespace diplom.Services
{
    public class StorageService : IStorageService
    {
        IStorageRepository _storageRepository;
        public StorageService(IStorageRepository storageRepository)
        {
            _storageRepository = storageRepository;
        }
        public bool SaveTask(byte[] image)
        {
            var task = _storageRepository.CreateTask();
            if (task == null)
            {
                return false;
            }
            using (FileStream fileStream = new FileStream(task.Url, FileMode.Create))
            {
                fileStream.Write(image, 0, image.Length);
            }
            return true;
        }

        public bool SaveTest(byte[] image)
        {
            var test = _storageRepository.CreateTest();
            if (test == null)
            {
                return false;
            }
            using (FileStream fileStream = new FileStream(test.Url, FileMode.Create))
            {
                fileStream.Write(image, 0, image.Length);
            }
            return true;
        }
    }
}
