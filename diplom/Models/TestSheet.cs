namespace diplom.Models
{
    public class TestSheet
    {
        public int Id { get; set; }
        public int? Result { get; set; }
        public string Url { get; set; }
        public string IdStudent { get; set; }
        public int IdTaskSheet { get; set; }
        public TaskSheet? TaskSheetNavigation { get; set; }
        public Student? StudentNavigation { get; set; }
    }
}
