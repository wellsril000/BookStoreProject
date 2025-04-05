import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/projectsAPI';

interface editBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

// This is creating a new form for a new book. The basically we are creating a new book object and the variable of id, title, author, etc.
// and the values we are putting next to them are basiclaly teh default values.
const editBookForm = ({ book, onSuccess, onCancel }: editBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookId, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>

      <label>
        Publisher:
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </label>

      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </label>

      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>

      <label>
        Page Count:
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </label>

      <label>
        Price:
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <button className="btn btn-success" type="submit">
        Edit Book
      </button>
      <button className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default editBookForm;
