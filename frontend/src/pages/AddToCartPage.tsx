import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function AddToCartPage() {
  const navigate = useNavigate();
  const { title, price, bookId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      bookTitle: title || 'No Book Found',
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
      <h3>Price: ${price}</h3>
      <div>
        <input
          type="number"
          placeholder="Enter quantity of books"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <button className="btn btn-primary" onClick={() => handleAddToCart()}>
          Add to Cart
        </button>
      </div>

      <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </>
  );
}

export default AddToCartPage;
