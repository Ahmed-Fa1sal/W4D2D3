using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add Swagger
builder.Services.AddSwaggerGen();
builder.Services.AddCors(Options =>
{
    Options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin()
    .AllowAnyHeader().AllowAnyMethod());
});
var app = builder.Build();

// Enable Swagger in Development Environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseRouting();

app.MapControllers();

app.Run();