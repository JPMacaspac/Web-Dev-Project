import { useMemo, useState } from 'react';
import { cookies } from '../data/cookies';
import { useCart } from '../context/CartContext';
import CookieCard from '../components/shop/CookieCard';
import './Shop.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'classic', label: 'Classics' },
  { key: 'choc', label: 'Chocolate' },
  { key: 'special', label: 'Specials' },
];

function Shop() {
  const { count, openCart } = useCart();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');

  const list = useMemo(() => {
    const f = cookies.filter((c) => filter === 'all' || c.category === filter);
    if (sort === 'low') return [...f].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...f].sort((a, b) => b.price - a.price);
    return f;
  }, [filter, sort]);

  return (
    <div className="shop">
      <div className="shop-inner">
        <div className="shop-hd">
          <div>
            <span className="sn-eyebrow">The shop</span>
            <h1>Our Cookies</h1>
            <p>Baked fresh in small batches. Pick your favorites and we'll have them ready.</p>
          </div>
          <button className="shop-cart" onClick={openCart}>
            🛒 Cart <b>{count}</b>
          </button>
        </div>

        <div className="shop-bar">
          <div className="shop-chips">
            {FILTERS.map((f) => (
              <button key={f.key} className={`shop-chip ${filter === f.key ? 'on' : ''}`}
                      onClick={() => setFilter(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="shop-sort">
            <span>{list.length} cookies</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort cookies">
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
        </div>

        <div className="shop-grid">
          {list.map((c, i) => (
            <CookieCard key={`${filter}-${sort}-${c.id}`} cookie={c} index={i} />
          ))}
        </div>

        <div className="shop-note">
          <span><b>Custom or bulk orders?</b> Tell us your event date and we'll bake for it.</span>
          <a href="/#contact">Contact us →</a>
        </div>
      </div>
    </div>
  );
}

export default Shop;