import { useEffect, useRef, useState } from 'react';
import './Intro.css';

const RING = 766.5; // circumference of the progress ring (r = 122)

let n = 0;
const WORDS = "Jayp's Snack Stack".split(' ').map((w) =>
  w.split('').map((ch) => ({ ch, d: 1.5 + n++ * 0.045 }))
);

const BUMPS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  return { cx: 160 + Math.cos(a) * 82, cy: 160 + Math.sin(a) * 82, r: 9 + (i % 3) * 1.5 };
});

const CHIPS = [
  [130, 125, 10, 7, 20], [188, 132, 11, 8, -30], [152, 168, 9, 6, 10],
  [205, 178, 10, 7, 45], [120, 185, 9, 6, -15], [170, 208, 11, 7, 25],
  [222, 140, 7, 5, 0], [102, 152, 7, 5, 60], [145, 98, 8, 6, -20], [185, 100, 7, 5, 35],
];

const CRUMBS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const r = 104 + (i % 3) * 8;
  return { cx: 160 + Math.cos(a) * r, cy: 160 + Math.sin(a) * r, r: 1.6 + (i % 3), alt: i % 2 };
});

const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const PHASES = ['', 'out', 'seaming', 'open'];

function Intro({ onOpen, onDone }) {
  const [go, setGo] = useState(false);
  const [phase, setPhase] = useState('');
  const progRef = useRef(null);
  const finishRef = useRef(() => {});

  useEffect(() => {
    let done = false;
    let raf = 0;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    document.body.style.overflow = 'hidden';

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      progRef.current?.setAttribute('stroke-dashoffset', 0);
      setPhase('out');
      later(() => setPhase('seaming'), 650);
      later(() => { setPhase('open'); onOpen?.(); }, 1050);
      later(() => onDone?.(), 2300);
    };
    finishRef.current = finish;

    const startId = requestAnimationFrame(() => setGo(true));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      later(finish, 400);
    } else {
      const t0 = performance.now();
      const D = 3900;
      const tick = (now) => {
        const p = Math.min(1, Math.max(0, (now - t0 - 300) / D));
        progRef.current?.setAttribute('stroke-dashoffset', RING * (1 - ease(p)));
        if (p < 1) raf = requestAnimationFrame(tick);
        else finish();
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(startId);
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const idx = PHASES.indexOf(phase);
  const cls = ['intro', go && 'go', idx >= 1 && 'out', idx >= 2 && 'seaming', idx >= 3 && 'open']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} role="status" aria-label="Loading Jayp's Snack Stack">
      <div className="intro-cur t" />
      <div className="intro-cur b" />
      <div className="intro-seam" />

      <span className="intro-corner tl">Small-batch cookies</span>
      <button className="intro-corner tr" onClick={() => finishRef.current()}>Skip</button>
      <span className="intro-corner bl">Baked fresh daily</span>

      <div className="intro-content">
        <div className="intro-stage">
          <svg viewBox="0 0 320 320" aria-hidden="true">
            <defs>
              <path id="intro-circ" d="M160 160 m-140 0 a140 140 0 1 1 280 0 a140 140 0 1 1 -280 0" />
              <radialGradient id="intro-dough" cx="38%" cy="32%" r="75%">
                <stop offset="0" stopColor="#f0bf6a" />
                <stop offset=".6" stopColor="#d9993f" />
                <stop offset="1" stopColor="#a86b27" />
              </radialGradient>
            </defs>

            <g className="intro-ringtxt">
              <text fill="#f3c77a" fontSize="11.5" letterSpacing="5">
                <textPath href="#intro-circ">
                  BAKED FRESH • MADE WITH CARE • SHARED WITH LOVE • NO SHORTCUTS •
                </textPath>
              </text>
            </g>

            <circle className="intro-track" cx="160" cy="160" r="122" />
            <circle ref={progRef} className="intro-prog" cx="160" cy="160" r="122"
                    strokeDasharray={RING} strokeDashoffset={RING} />

            <g className="intro-crumbs">
              {CRUMBS.map((c, i) => (
                <circle key={i} cx={c.cx} cy={c.cy} r={c.r}
                        fill={c.alt ? '#e8a33d' : '#f6e7cf'} opacity=".8" />
              ))}
            </g>

            <g className="intro-steam">
              <path style={{ '--d': '2.2s' }} d="M130 62q-8-12 0-24t0-22" />
              <path style={{ '--d': '2.8s' }} d="M160 56q-8-12 0-24t0-22" />
              <path style={{ '--d': '3.3s' }} d="M190 62q-8-12 0-24t0-22" />
            </g>

            <g className="intro-cookie">
              <g fill="#b97a2e">
                {BUMPS.map((b, i) => <circle key={i} cx={b.cx} cy={b.cy} r={b.r} />)}
              </g>
              <circle cx="160" cy="160" r="84" fill="url(#intro-dough)" />
              <circle cx="160" cy="160" r="84" fill="none" stroke="#8d5a22" strokeWidth="2" opacity=".5" />
              <g fill="#3b2418">
                {CHIPS.map(([cx, cy, rx, ry, rot], i) => (
                  <ellipse key={i} className="intro-chip" cx={cx} cy={cy} rx={rx} ry={ry}
                           transform={`rotate(${rot} ${cx} ${cy})`}
                           style={{ '--d': `${1 + i * 0.12}s` }} />
                ))}
              </g>
            </g>
          </svg>
        </div>

        <h1 className="intro-title" aria-label="Jayp's Snack Stack">
          {WORDS.map((word, wi) => (
            <span className="intro-w" key={wi} aria-hidden="true">
              {word.map((l, li) => (
                <span className="intro-l" key={li} style={{ '--d': `${l.d}s` }}>{l.ch}</span>
              ))}
            </span>
          ))}
        </h1>

        <div className="intro-rule" />
        <p className="intro-tag">Watch it come to life</p>
      </div>
    </div>
  );
}

export default Intro;