import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookPage from './pages/BookPage';
import AddToCartPage from './pages/AddToCartPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route
              path="/addToCart/:title/:price/:bookId"
              element={<AddToCartPage />}
            />
            <Route path="/books" element={<BookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminpage" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
