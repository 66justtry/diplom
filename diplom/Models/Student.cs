namespace diplom.Models
{
    public class Student
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int IdGroup { get; set; }
        public Group? GroupNavigation { get; set; }
        public ICollection<TestSheet> TestSheetNavigation { get; set; } = new List<TestSheet>();
    }
}
