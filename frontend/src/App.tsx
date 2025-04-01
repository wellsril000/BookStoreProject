import './App.css';
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeBand from './WelcomeBand';
import { useState } from 'react';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // this is a list of categories that have been checked
  return (
    <>
      <div className="container mt-4">
        <div className="row bg-primary text-white">
          <WelcomeBand />
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
