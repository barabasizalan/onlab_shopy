
using BLL.Entities;
using BLL.Repositories;
using BLL.Services;
using DAL.DbContext;
using DAL.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                });
            builder.Services.AddDbContext<ShopyDbContext>(options => options.UseSqlServer(
                builder.Configuration.GetConnectionString("ShopyConnection")));

            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<User>(options =>
            {
                options.Password.RequiredLength = 6;
                options.User.RequireUniqueEmail = true;
                options.Password.RequireNonAlphanumeric = false;
                options.SignIn.RequireConfirmedEmail = false;
            })
                .AddRoles<IdentityRole>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddSignInManager<SignInManager<User>>()
                .AddUserManager<UserManager<User>>()
                .AddEntityFrameworkStores<ShopyDbContext>();

            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = false;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<IProductService, ProductService>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
            builder.Services.AddScoped<ICategoryService, CategoryService>();
            builder.Services.AddScoped<IImageService, ImageService>();
            builder.Services.AddScoped<IImageRepository, ImageRepository>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ICartRepository, CartRepository>();
            builder.Services.AddScoped<ICartService, CartService>();
            builder.Services.AddScoped<IOrderRepository, OrderRepository>();
            builder.Services.AddScoped<IOrderService, OrderService>();
            builder.Services.AddScoped<IStatusRepository, StatusRepository>();

            builder.Services.AddCors(options => {
                options.AddPolicy("AllowReactFrontend",
                    builder =>
                    {
                        builder
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();

            app.MapPost("/logout", async (SignInManager<User> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return Results.Ok();
            });

            app.MapIdentityApi<User>();

            app.UseCors("AllowReactFrontend");

            app.UseAuthorization();

            app.MapControllers();
            app.Run();
        }
    }
}
