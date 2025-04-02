import { Links, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  //   const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  //   const subtotal = cart.reduce()

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
                <div className="container p-0">
                  <div className="card mb-3 border border-primary border-2 ">
                    <div className="card-body">
                      <div key={item.bookId}>
                        {/* Book icon from Bootstrap Icons */}
                        <i
                          className="bi bi-book"
                          style={{ marginRight: '8px', color: 'blue' }}
                        ></i>
                        <span className="fs-4"> {item.bookTitle} </span>
                        <br />
                        <span>
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </span>
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
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button className="btn btn-primary me-2">Checkout</button>
      <button
        className="btn btn-secondary ms-2
      "
        onClick={() => navigate('/books')}
      >
        Continue Browsing
      </button>
    </div>
  );
}

export default CartPage;
