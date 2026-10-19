import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">Your cart is empty 🍪</h2>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.map((item, index) => (
        <div className="cart-item" key={index}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>₱{item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h2 className="cart-total">Total: ₱{total}</h2>
    </div>
  );
}

export default Cart;