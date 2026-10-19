import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CookieArt from '../ui/CookieArt';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

function CartDrawer() {
  const { cartItems, count, subtotal, updateQty, removeFromCart, drawerOpen, closeCart, placeOrder } = useCart();
  const navigate = useNavigate();

  // close with Escape, and lock page scroll while open
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeCart();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen, closeCart]);

  const checkout = () => {
    placeOrder();
    navigate('/receipt');
  };

  return (
    <>
      <div className={`cd-veil ${drawerOpen ? 'on' : ''}`} onClick={closeCart} />
      <aside className={`cd ${drawerOpen ? 'on' : ''}`} role="dialog" aria-modal="true"
             aria-label="Shopping cart" aria-hidden={!drawerOpen}>
        <div className="cd-hd">
          <h2>Your cart</h2>
          <button onClick={closeCart} aria-label="Close cart">×</button>
        </div>

        <div className="cd-list">
          {cartItems.length === 0 ? (
            <div className="cd-empty">
              <div>🍪</div>
              <p>Your cart is empty.</p>
              <Link to="/shop" className="sn-btn" onClick={closeCart}>Browse cookies</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cd-item" key={item.id}>
                <div className="cd-th">
                  <CookieArt dough={item.dough} edge={item.edge} chip={item.chip} />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <small>₱{item.price} each</small>
                  <div className="cd-qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Less">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="More">+</button>
                  </div>
                </div>
                <div className="cd-side">
                  <b>₱{item.qty * item.price}</b>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cd-ft">
          <div className="cd-total"><span>Total ({count})</span><b>₱{subtotal}</b></div>
          <button className="cd-go" disabled={count === 0} onClick={checkout}>Checkout</button>
          <small>Demo checkout. No real payment is taken.</small>
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;