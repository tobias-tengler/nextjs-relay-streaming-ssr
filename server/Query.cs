namespace server;

[QueryType]
public class Query
{
  public async Task<string> GetMainContentdAsync()
  {
    await Task.Delay(2000);
    return "Main content" + DateTime.UtcNow.Ticks;
  }

  public async Task<string> GetLazyContentdAsync()
  {
    await Task.Delay(4000);
    return "Lazy content" + DateTime.UtcNow.Ticks;
  }
}