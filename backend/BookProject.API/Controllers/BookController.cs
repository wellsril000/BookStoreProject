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
            query = sortOrder.ToLower() == "asc"
                ? query.OrderBy(x => x.Title)
                : query.OrderByDescending(x => x.Title);

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

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookDbContext.Books.Add(newBook);
            _bookDbContext.SaveChanges();

            return Ok(newBook);
        }

        [HttpPut("updateBook/{bookId}")] // NOT SURE IF THIS WILL CAUSE AN ERROR WITH THE ID
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookDbContext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookDbContext.Books.Update(existingBook);
            _bookDbContext.SaveChanges();

            return Ok(existingBook);
        }
        [HttpDelete("deleteBook/{bookId}")]

        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookDbContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not Found"});
            }

            _bookDbContext.Books.Remove(book);
            _bookDbContext.SaveChanges();

            return NoContent();
        }


    }
}
