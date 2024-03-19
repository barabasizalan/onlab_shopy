using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopyBackend.BLL_Domain_;
using ShopyBackend.BLL_Domain_.Services;
using ShopyBackend.DAL;
using ShopyBackend.DAL.DbContext;
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
                        builder
                        .WithOrigins("http://localhost:5173")
                        .WithOrigins("http://localhost:5173/")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithExposedHeaders("Set-Cookie")
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
                    //Password settings
                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequiredLength = 8;
                    options.Password.RequiredUniqueChars = 6;

                    //Signin settings
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                    options.Lockout.MaxFailedAccessAttempts = 10;
                    options.Lockout.AllowedForNewUsers = true;
                })
                .AddRoles<IdentityRole>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddSignInManager<SignInManager<User>>()
                .AddUserManager<UserManager<User>>()
                .AddEntityFrameworkStores<ShopyDbContext>()
                .AddDefaultTokenProviders();


            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = false;
                options.Cookie.SecurePolicy = CookieSecurePolicy.None;
                options.Cookie.SameSite = SameSiteMode.None;
                //options.LoginPath = "/account/login";
                options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                options.Cookie.MaxAge = options.ExpireTimeSpan; // optional
                options.Cookie.Name = "ShopyCookie";
            });

            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<IProductService, ProductService>();
            
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
