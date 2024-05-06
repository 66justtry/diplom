namespace diplom.Services
{
    public interface IUserService
    {
        bool CreateTeacher(string name, string email, string password);

        bool CreateStudent(string name, string email, string password, int idGroup);
    }
}
