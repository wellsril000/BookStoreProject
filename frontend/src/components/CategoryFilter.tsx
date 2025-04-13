import { useEffect, useState } from 'react';
import './CategoryFilter.css';
import { API_URL } from '../api/projectsAPI';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]); // this is a list of all categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/GetBookTypes`);
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.log('Error Fetching Categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckBoxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h3>Book Categories</h3>
      <div className="category-list">
        {categories.map((b) => (
          <div key={b} className="category-item">
            <input
              type="checkbox"
              id={b}
              value={b}
              className="category-checkbox"
              onChange={handleCheckBoxChange}
            />
            <label htmlFor={b}>{b}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
