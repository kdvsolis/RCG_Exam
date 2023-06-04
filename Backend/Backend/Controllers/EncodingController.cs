using Microsoft.AspNetCore.Mvc;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EncodingController : ControllerBase
    {
        private readonly Random _random = new Random();

        [HttpGet]
        [Route("{text}")]
        public async Task Encode(string text)
        {
            // Convert the input text to base64 format
            var base64 = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(text));

            // Loop through each character and return it with a random delay
            foreach (var c in base64)
            {
                // Create a random number between 1 and 5
                var random = new Random();
                var delay = random.Next(1, 6);

                // Wait for the delay in seconds
                await Task.Delay(delay * 1000);

                // Return the character as a string
                await Response.WriteAsync(c.ToString());
            }
        }
    }
}
