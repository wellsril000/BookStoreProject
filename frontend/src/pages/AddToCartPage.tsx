import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function AddToCartPage() {
  const navigate = useNavigate();
  const { title, price, bookId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      bookTitle: bookTitle || 'No Book Found',
      quantity,
      price: Number(price),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>{title}</h2>
      <div>
        <input
          type="number"
          placeholder="Enter quantity of books"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <button onClick={() => navigate('/cart')}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default AddToCartPage;
