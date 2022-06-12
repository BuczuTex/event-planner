using PlanistaAPI.DataLayer;

using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using System.Text;

using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<PlanistaDbContext>().AddIdentity<User, IdentityRole<Guid>>(opt =>
    opt.SignIn.RequireConfirmedEmail = true).AddEntityFrameworkStores<PlanistaDbContext>()
    .AddDefaultTokenProviders();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers().AddNewtonsoftJson(options => {
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Bearer", opt => {
        opt.SaveToken = true;
        opt.RequireHttpsMetadata = false;

        opt.TokenValidationParameters = new TokenValidationParameters() {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = "https://localhost:4200",
            ValidAudience = "https://localhost:7290",

            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super-ultra-secret-key:2337122#@$"))
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("Authentication"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
