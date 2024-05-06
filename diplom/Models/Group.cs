namespace diplom.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Student> StudentNavigation { get; set; } = new List<Student>();
    }
}
