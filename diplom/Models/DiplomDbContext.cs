using Microsoft.EntityFrameworkCore;

namespace diplom.Models
{
    public partial class DiplomDbContext : DbContext
    {
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Teacher> Teachers { get; set; }
        public virtual DbSet<TestSheet> TestSheets { get; set; }
        public virtual DbSet<TaskSheet> TaskSheets { get; set; }
        public DiplomDbContext() {
        
        }
        public DiplomDbContext(DbContextOptions<DiplomDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasKey(e => e.Id);
            });
            modelBuilder.Entity<Student>(entity =>
            {
                entity.HasKey(e => e.Email);
                entity.HasOne(e => e.GroupNavigation).WithMany(g => g.StudentNavigation).HasForeignKey(e => e.IdGroup);
            });
            modelBuilder.Entity<Teacher>(entity =>
            {
                entity.HasKey(e => e.Email);
            });
            modelBuilder.Entity<TestSheet>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.StudentNavigation).WithMany(s => s.TestSheetNavigation).HasForeignKey(e => e.IdStudent);
                entity.HasOne(e => e.TaskSheetNavigation).WithMany(t => t.TestSheetNavigation).HasForeignKey(e => e.IdTaskSheet);
            });
            modelBuilder.Entity<TaskSheet>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.TeacherNavigation).WithMany(t => t.TaskSheetNavigation).HasForeignKey(e => e.IdTeacher);
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
