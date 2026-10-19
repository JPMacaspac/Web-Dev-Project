import { useRef, useState } from 'react';
import CookieArt from '../ui/CookieArt';
import { useCart } from '../../context/CartContext';
import './CookieCard.css';

function CookieCard({ cookie, index = 0 }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const btnRef = useRef(null);

  // a small cookie flies from the button to the navbar cart
  const fly = () => {
    const target = document.getElementById('nav-cart');
    const btn = btnRef.current;
    if (!target || !btn || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const a = btn.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const el = document.createElement('span');
    el.textContent = '🍪';
    Object.assign(el.style, {
      position: 'fixed', zIndex: 300, pointerEvents: 'none', fontSize: '1.6rem',
      left: `${a.left + a.width / 2}px`, top: `${a.top}px`,
    });
    document.body.appendChild(el);

    const dx = b.left + b.width / 2 - (a.left + a.width / 2);
    const dy = b.top + b.height / 2 - a.top;
    const anim = el.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(.4)`, opacity: 0.2 },
      ],
      { duration: 700, easing: 'cubic-bezier(.5,-.2,.7,1)' }
    );
    anim.onfinish = () => el.remove();
  };

  const handleAdd = () => {
    addToCart(cookie, qty);
    fly();
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="ck" style={{ '--d': `${index * 0.1}s` }}>
      <div className="ck-plate">
        <CookieArt dough={cookie.dough} edge={cookie.edge} chip={cookie.chip} />
      </div>

      <h3>{cookie.name}</h3>
      <p>{cookie.description}</p>
      <div className="ck-price">₱{cookie.price}</div>

      <div className="ck-act">
        <div className="ck-qty">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Less">−</button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="More">+</button>
        </div>
        <button ref={btnRef} className={`ck-add ${added ? 'done' : ''}`} onClick={handleAdd}>
          {added ? 'Added ✓' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}

export default CookieCard;