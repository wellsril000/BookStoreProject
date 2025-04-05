import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/projectsAPI';
import Pagination from './pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10); // pageSize holds the current page size, setPageSize -> A function that updates pageSize
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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

                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate(`/addToCart/${b.title}/${b.price}/${b.bookId}`)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPageNum(1);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default BookList;
