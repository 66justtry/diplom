namespace diplom.Models
{
    public class Teacher
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<TaskSheet> TaskSheetNavigation { get; set; } = new List<TaskSheet>();
    }
}
