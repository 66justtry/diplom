using diplom.Repositories;

namespace diplom.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public bool CreateStudent(string name, string email, string password, int idGroup)
        {
            return _userRepository.CreateStudent(name, email, password, idGroup);
        }

        public bool CreateTeacher(string name, string email, string password)
        {
            return _userRepository.CreateTeacher(name, email, password);
        }
    }
}
