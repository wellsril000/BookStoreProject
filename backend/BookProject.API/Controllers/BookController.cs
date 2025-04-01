using BookProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookDbContext;

        public BookController(BookDbContext temp)
        {
            _bookDbContext = temp;
        }

        [HttpGet("GetAllBooks")]
        public IActionResult GetAllBooks(int pageSize = 10, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? bookTypes = null)
        {
            var query = _bookDbContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            var totalNumBooks = query.Count();
            
            var books = _bookDbContext.Books.AsQueryable();
            
            // Apply sorting
            books = sortOrder.ToLower() == "asc"
                ? books.OrderBy(x => x.Title)
                : books.OrderByDescending(x => x.Title);

            var paginatedBooks = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            

            var bookObject = new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks,
            };
            
            return Ok(bookObject);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetProjectTypes()
        {
            var bookCategories = _bookDbContext.Books
                .Select(b => b.Category)
                .Distinct() // this gives us only the distinct project types 
                .ToList();

            return Ok(bookCategories);
        }
    }
}
