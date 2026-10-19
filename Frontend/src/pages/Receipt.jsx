import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Receipt.css';

function Receipt() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="rc">
        <div className="rc-card">
          <h1>No order yet</h1>
          <p>Your receipt will show up here after you check out.</p>
          <Link to="/shop" className="sn-btn fill">Go to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rc">
      <div className="rc-card">
        <div className="rc-emoji">🍪</div>
        <h1>Thank you!</h1>
        <p className="rc-meta">Order {lastOrder.number} · {lastOrder.date}</p>

        <ul className="rc-list">
          {lastOrder.items.map((i) => (
            <li key={i.id}>
              <span>{i.qty} × {i.name}</span>
              <span>₱{i.qty * i.price}</span>
            </li>
          ))}
        </ul>

        <div className="rc-total"><span>Total</span><span>₱{lastOrder.total}</span></div>
        <p className="rc-demo">Demo only. No real order was placed.</p>
        <Link to="/shop" className="sn-btn fill">Order more</Link>
      </div>
    </div>
  );
}

export default Receipt;