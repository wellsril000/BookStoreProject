using System.ComponentModel.DataAnnotations;

namespace BookProject.API.Data;

public class Book
{
    [Key]
    public int BookId { get; set; }
    
    public string Title { get; set; }
    
    public string Author { get; set; }
    
    public string Publisher { get; set; }
    
    public string ISBN { get; set; }
    
    public string Classification { get; set; }
    
    public string Category { get; set; }
    
    public int PageCount { get; set; }
    
    public double Price { get; set; }

    
}