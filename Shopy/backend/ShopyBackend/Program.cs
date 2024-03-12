
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_;
using ShopyBackend.DAL;
using ShopyBackend.DAL.Entities;

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
                        .AllowAnyMethod()
                        .AllowCredentials();
                    });
            }
            );
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ShopyDbContext>(options => options.UseSqlServer(
                builder.Configuration.GetConnectionString("ShopyConnection")));

            builder.Services.AddAuthorization();

            builder.Services.AddIdentity<User, IdentityRole>(options =>
                { 
                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequiredLength = 8;
                })
                .AddRoles<IdentityRole>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddSignInManager<SignInManager<User>>()
                .AddUserManager<UserManager<User>>()
                .AddEntityFrameworkStores<ShopyDbContext>()
                .AddDefaultTokenProviders();


            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(1);
                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.SlidingExpiration = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

            builder.Services.AddScoped<IAuthService, AuthService>();
            
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();

            app.UseCors("AllowReactFrontend");

            app.UseAuthentication();
            app.UseAuthorization();

            
            app.MapControllers();

            app.Run();
        }
    }
}
