import { Links, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <>
                <li key={item.bookId}>
                  {item.bookTitle}: ${item.price.toFixed(2)}{' '}
                  <span style={{ marginLeft: '8px' }}>
                    Qty: {item.quantity}
                  </span>
                  <span style={{ marginLeft: '8px' }}></span>
                  <button
                    onClick={() => removeFromCart(item.bookId)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                  <br />
                  <br />
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
