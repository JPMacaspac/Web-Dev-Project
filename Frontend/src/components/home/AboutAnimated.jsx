import { useEffect, useRef, useState } from 'react';
import CookieArt from '../ui/CookieArt';
import { FLAVORS } from '../../data/flavors';
import './AboutAnimated.css';

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - t0) / 1400);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        io.disconnect();
      },
      { threshold: 0.6 }
    );
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  return <b ref={ref}>{value}{suffix}</b>;
}

function AboutAnimated() {
  const dc = FLAVORS[1];

  return (
    <section className="ab">
      <div className="ab-inner">
        <div>
          <span className="sn-eyebrow rv">Our story</span>
          <h2 className="rv" style={{ '--d': '.1s' }}>
            One simple idea: good cookies don't need shortcuts.
          </h2>
          <p className="rv" style={{ '--d': '.2s' }}>
            What started as a small home kitchen passion turned into Jayp's
            Snack Stack. Every batch is made fresh, using real butter, quality
            chocolate, and recipes tested until they felt right.
          </p>

          <div className="ab-stats">
            <div className="ab-stat rv z" style={{ '--d': '.1s' }}>
              <CountUp to={5} /><span>Signature flavors</span>
            </div>
            <div className="ab-stat rv z" style={{ '--d': '.2s' }}>
              <CountUp to={100} suffix="%" /><span>Fresh ingredients</span>
            </div>
            <div className="ab-stat rv z" style={{ '--d': '.3s' }}>
              <b>0</b><span>Preservatives</span>
            </div>
            <div className="ab-stat rv z" style={{ '--d': '.4s' }}>
              <b>Daily</b><span>Baked batches</span>
            </div>
          </div>
        </div>

        <div className="ab-collage rv r">
          <div className="ab-card c1">
            <CookieArt dough={dc.dough} edge={dc.edge} chip={dc.chip} />
          </div>
          <div className="ab-card c2"><CookieArt /></div>
          <div className="ab-card c3">“Baked fresh. Made with care. Shared with love.”</div>
        </div>
      </div>
    </section>
  );
}

export default AboutAnimated;