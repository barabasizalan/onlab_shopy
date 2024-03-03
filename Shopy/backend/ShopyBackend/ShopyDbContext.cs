using Microsoft.EntityFrameworkCore;
using ShopyBackend.Models;

namespace ShopyBackend
{
    public class ShopyDbContext: DbContext
    {
        public ShopyDbContext(DbContextOptions<ShopyDbContext> options): base(options) { }
        
        public DbSet<Product> Product { get; set; }
        public DbSet<Cart> Cart {  get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Status> Status { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category);

            modelBuilder.Entity<OrderDetails>()
                .Property(od => od.PurchasePrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}
