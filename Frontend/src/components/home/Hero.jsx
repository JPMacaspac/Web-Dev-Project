import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CookieArt from '../ui/CookieArt';
import { FLAVORS } from '../../data/flavors';
import './Hero.css';

const WORDS = [
  ['Good', false], ['cookies', false], ["don't", true], ['need', false], ['shortcuts.', true],
];

function Hero() {
  const stageRef = useRef(null);

  // mouse position moves each layer by a different amount (parallax)
  const handleMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5) * 2);
    el.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5) * 2);
  };

  const dc = FLAVORS[1];
  const wm = FLAVORS[4];
  const cr = FLAVORS[2];

  return (
    <header className="hero" onMouseMove={handleMove}>
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="sn-eyebrow hero-fade" style={{ '--d': '.1s' }}>
            Small-batch cookies · Baked daily
          </span>

          <h1>
            {WORDS.map(([word, em], i) => (
              <span key={word}>
                <span className="hero-w">
                  <span style={{ '--d': `${0.3 + i * 0.12}s` }}>
                    {em ? <em>{word}</em> : word}
                  </span>
                </span>{' '}
              </span>
            ))}
          </h1>

          <p className="hero-lead hero-fade" style={{ '--d': '1.1s' }}>
            Real butter, quality chocolate, and recipes tested until they felt
            right. No preservatives, no mass production, just cookies made the
            way they're meant to be.
          </p>

          <div className="hero-cta hero-fade" style={{ '--d': '1.3s' }}>
            <Link to="/shop" className="sn-btn fill">Order now</Link>
            <a href="#favorites" className="sn-btn">See favorites</a>
          </div>

          <div className="hero-meta hero-fade" style={{ '--d': '1.5s' }}>
            <div><b>5.0</b><span>210+ reviews</span></div>
            <div><b>0</b><span>preservatives</span></div>
            <div><b>Daily</b><span>fresh batches</span></div>
          </div>
        </div>

        <div className="hero-stage" ref={stageRef}>
          <div className="hero-layer" style={{ '--k': -6 }}>
            <i className="hero-crumb" style={{ width: 10, height: 10, left: '8%', top: '20%', '--d': '0s' }} />
            <i className="hero-crumb" style={{ width: 7, height: 7, left: '88%', top: '14%', '--d': '.8s' }} />
            <i className="hero-crumb" style={{ width: 12, height: 12, left: '92%', top: '60%', '--d': '1.4s' }} />
            <i className="hero-crumb" style={{ width: 8, height: 8, left: '4%', top: '72%', '--d': '.4s' }} />
          </div>

          <div className="hero-layer" style={{ '--k': 10 }}>
            <div className="hero-big"><CookieArt /></div>
          </div>

          <div className="hero-layer" style={{ '--k': 22 }}>
            <div className="hero-mini" style={{ left: '-4%', top: '6%', '--d': '.8s' }}>
              <CookieArt dough={dc.dough} edge={dc.edge} chip={dc.chip} />
            </div>
            <div className="hero-mini" style={{ right: '-2%', top: '2%', width: '20%', '--d': '1s' }}>
              <CookieArt dough={wm.dough} edge={wm.edge} chip={wm.chip} />
            </div>
            <div className="hero-mini" style={{ left: '2%', bottom: '-2%', width: '22%', '--d': '1.2s' }}>
              <CookieArt dough={cr.dough} edge={cr.edge} chip={cr.chip} />
            </div>
          </div>

          <div className="hero-badge">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="hero-badge-path" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <circle cx="60" cy="60" r="58" fill="#e8a33d" />
              <text fontSize="10.5" letterSpacing="3.2" fontWeight="700" fill="#3b2418">
                <textPath href="#hero-badge-path">FRESH OUT OF THE OVEN • HOME KITCHEN •</textPath>
              </text>
            </svg>
            <div className="hero-badge-mid">🔥</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">Scroll</div>
    </header>
  );
}

export default Hero;