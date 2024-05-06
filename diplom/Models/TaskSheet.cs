namespace diplom.Models
{
    public class TaskSheet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string IdTeacher { get; set; }
        public Teacher? TeacherNavigation { get; set; }
        public ICollection<TestSheet> TestSheetNavigation { get; set; } = new List<TestSheet>();
    }
}
