namespace diplom.Repositories
{
    public interface IUserRepository
    {
        bool CreateTeacher(string name, string email, string password);

        bool CreateStudent(string name, string email, string password, int idGroup);
    }
}
