import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const LINKS = [
  { label: 'Home', to: '/', section: 'top' },
  { label: 'About', to: '/', section: 'about' },
  { label: 'Favorites', to: '/', section: 'favorites' },
  { label: 'Contact', to: '/', section: 'contact' },
  { label: 'Shop', to: '/shop' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const { pathname, hash } = useLocation();
  const { count, openCart } = useCart();
  const isHome = pathname === '/';

  // solid background after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // cart badge pops whenever the count changes
  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  // after changing page: close menu, then jump to the section or to the top
  useEffect(() => {
    setOpen(false);
    if (hash) {
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  // already on Home: scroll directly instead of navigating
  const handleClick = (e, link) => {
    setOpen(false);
    if (!isHome || !link.section) return;
    e.preventDefault();
    if (link.section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hrefFor = (link) =>
    link.section && link.section !== 'top'
      ? { pathname: link.to, hash: `#${link.section}` }
      : link.to;

  return (
    <header className={`navbar ${scrolled || !isHome ? 'solid' : ''} ${open ? 'menu-open' : ''}`}>
      <Link to="/" className="nav-logo" aria-label="Jayp's Snack Stack home"
            onClick={(e) => handleClick(e, LINKS[0])}>
        🍪
      </Link>

      <nav className="nav-links" aria-label="Main">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            to={hrefFor(link)}
            className={`nav-link ${link.to === '/shop' && pathname === '/shop' ? 'active' : ''}`}
            onClick={(e) => handleClick(e, link)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        <button id="nav-cart" className="nav-icon nav-cart" onClick={openCart}
                aria-label={`Open cart, ${count} items`}>
          🛒
          {count > 0 && <span className={`nav-count ${bump ? 'bump' : ''}`}>{count}</span>}
        </button>

        <Link to="/login" className="nav-icon" aria-label="Log in">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
          </svg>
        </Link>

        <button className="nav-burger" aria-label="Toggle menu" aria-expanded={open}
                onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;