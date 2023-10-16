var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddCors()
    .AddGraphQLServer()
    .ModifyOptions(o => o.EnableDefer = true)
    .AddTypes();

var app = builder.Build();

app.UseCors(o => o.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapGraphQL();

app.RunWithGraphQLCommands(args);
