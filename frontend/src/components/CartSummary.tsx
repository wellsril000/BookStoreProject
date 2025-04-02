import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      <span>
        🛒 <strong>${totalAmount.toFixed(2)}</strong>
      </span>
      <span>Qty: {totalQty}</span>
    </div>
  );
};

export default CartSummary;
