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
        public IActionResult GetAllBooks(int pageSize = 10, int pageNum = 1, string sortOrder = "asc")
        {
            var books = _bookDbContext.Books.AsQueryable();
            
            // Apply sorting
            books = sortOrder.ToLower() == "asc"
                ? books.OrderBy(x => x.Title)
                : books.OrderByDescending(x => x.Title);
            
            var paginatedBooks = books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _bookDbContext.Books.Count();
            

            var bookObject = new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks,
            };
            
            return Ok(bookObject);
        }
    }
}
