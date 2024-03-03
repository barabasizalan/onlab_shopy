
using Microsoft.EntityFrameworkCore;

namespace ShopyBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors(options => {
                options.AddPolicy("AllowReactFrontend",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
                }
            );
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<ShopyDbContext>(options => options.UseSqlServer(
                builder.Configuration.GetConnectionString("ShopyConnection")));
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowReactFrontend");
            app.MapControllers();

            app.Run();
        }
    }
}
