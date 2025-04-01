import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10); // pageSize holds the current page size, setPageSize -> A function that updates pageSize
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');
      const response = await fetch(
        `https://localhost:5000/Book/GetAllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json(); // data will hold the data
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortOrder, selectedCategories]);

  return (
    <>
      <div className="book-list">
        <label className="form-label">
          <h3>Sort Books: </h3>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <div className="card-container">
          {books.map((b) => (
            <div className="card" key={b.bookId}>
              <h3 className="card-title">{b.title}</h3>
              <div className="card-body">
                <p>
                  <b>Author:</b> {b.author}
                </p>
                <p>
                  <b>Publisher:</b> {b.publisher}
                </p>
                <p>
                  <b>ISBN:</b> {b.isbn}
                </p>
                <p>
                  <b>Classification:</b> {b.classification}
                </p>
                <p>
                  <b>Category:</b> {b.category}
                </p>
                <p>
                  <b>Page Count:</b> {b.pageCount}
                </p>
                <p>
                  <b>Price:</b> ${b.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        <br />
        Results Per Page:
        <select
          value={pageSize}
          onChange={(b) => {
            setPageSize(Number(b.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
