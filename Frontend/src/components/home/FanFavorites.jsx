import { useState } from 'react';
import { Link } from 'react-router-dom';
import CookieArt from '../ui/CookieArt';
import { FLAVORS } from '../../data/flavors';
import './FanFavorites.css';

const TABS = [
  { label: '🍪 Best Seller', order: [0, 1, 2, 3, 4] },
  { label: '⭐ Top Rated', order: [2, 0, 4, 1, 3] },
  { label: '📦 Most Ordered', order: [1, 3, 0, 4, 2] },
];

function FanFavorites() {
  const [tab, setTab] = useState(0);
  const [cur, setCur] = useState(0);

  const order = TABS[tab].order;
  const n = order.length;
  const half = Math.floor(n / 2);
  const active = FLAVORS[order[cur]];

  const go = (i) => setCur((i + n) % n);
  const pickTab = (i) => { setTab(i); setCur(0); };

  return (
    <section className="fav">
      <div className="fav-inner">
        <span className="sn-eyebrow rv">Fan favorites</span>
        <h2 className="rv" style={{ '--d': '.1s' }}>
          The cookies our customers keep coming back for
        </h2>

        <div className="fav-tabs rv" style={{ '--d': '.2s' }}>
          {TABS.map((t, i) => (
            <button key={t.label} className={`fav-tab ${tab === i ? 'on' : ''}`}
                    onClick={() => pickTab(i)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="fav-car rv z" style={{ '--d': '.2s' }}>
          <button className="fav-arr p" onClick={() => go(cur - 1)} aria-label="Previous">‹</button>

          {order.map((fi, i) => {
            const f = FLAVORS[fi];
            const o = ((i - cur + n + half) % n) - half;
            const a = Math.abs(o);
            return (
              <button
                key={`${tab}-${f.id}`}
                className="fav-it"
                onClick={() => go(i)}
                aria-label={f.name}
                style={{
                  '--o': o,
                  '--s': o === 0 ? 1.1 : 0.62,
                  opacity: a > 1 ? 0 : o === 0 ? 1 : 0.45,
                  zIndex: 10 - a,
                  filter: o === 0 ? 'none' : 'blur(1.5px) brightness(.8)',
                  pointerEvents: a > 1 ? 'none' : 'auto',
                }}
              >
                <CookieArt dough={f.dough} edge={f.edge} chip={f.chip} />
              </button>
            );
          })}

          <button className="fav-arr n" onClick={() => go(cur + 1)} aria-label="Next">›</button>
        </div>

        <div className="fav-dots">
          {order.map((_, i) => <i key={i} className={i === cur ? 'on' : ''} />)}
        </div>

        <div className="fav-info" key={`${tab}-${active.id}`}>
          <h3>{active.name}</h3>
          <div className="fav-stars">
            ★★★★★ <span>5.0 (210 reviews)</span>
          </div>
          <p>{active.desc}</p>
          <div className="fav-price">₱{active.price}</div>
          <Link to="/shop" className="sn-btn fill">Order now</Link>
        </div>
      </div>
    </section>
  );
}

export default FanFavorites;