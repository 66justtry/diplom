using diplom.Models;

namespace diplom.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DiplomDbContext _context;
        public UserRepository(DiplomDbContext context)
        {
            _context = context;
        }

        public bool CreateStudent(string name, string email, string password, int idGroup)
        {
            _context.Students.Add(new Student { Name = name, Email = email, Password = password, IdGroup = idGroup });
            return _context.SaveChanges() > 0;
        }

        public bool CreateTeacher(string name, string email, string password)
        {
            _context.Teachers.Add(new Teacher { Name = name, Email = email, Password = password });
            return _context.SaveChanges() > 0;
        }
    }
}
