import './Marquee.css';

const ITEMS = [
  'Real butter', 'Quality chocolate', 'No preservatives',
  'Baked daily', 'Small batch', 'Made with care',
];

function Marquee() {
  // two identical halves so the loop is seamless
  const half = [...ITEMS, ...ITEMS];
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {[0, 1].map((n) =>
          half.map((t, i) => <span key={`${n}-${i}`}>🍪 {t}</span>)
        )}
      </div>
    </div>
  );
}

export default Marquee;