namespace diplom.Services
{
    public interface IStorageService
    {
        bool SaveTask(byte[] image);
        bool SaveTest(byte[] image);
    }
}
