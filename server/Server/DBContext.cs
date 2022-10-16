using Microsoft.EntityFrameworkCore;
using DB.Models;

namespace DB
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }

        public DbSet<User>? Users { get; set; }
    }
}