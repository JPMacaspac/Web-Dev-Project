import './Process.css';

const STEPS = [
  { n: '01', icon: '🧈', title: 'Choose', text: "Real butter, quality chocolate, and nothing we can't pronounce." },
  { n: '02', icon: '🥣', title: 'Mix & chill', text: 'Small doughs rest overnight so the flavor has time to deepen.' },
  { n: '03', icon: '🔥', title: 'Bake', text: 'Baked in small batches until the edges are golden and the centers stay soft.' },
  { n: '04', icon: '🎁', title: 'Share', text: 'Packed fresh the same day, for gifts, events, or just yourself.' },
];

function Process() {
  return (
    <section className="pr">
      <div className="pr-inner">
        <span className="sn-eyebrow rv">How it's made</span>
        <h2 className="rv" style={{ '--d': '.1s' }}>From our kitchen to your hands</h2>

        <div className="pr-steps">
          {STEPS.map((s, i) => (
            <div className="pr-step rv" key={s.n} style={{ '--d': `${0.1 + i * 0.1}s` }}>
              <span className="pr-n">{s.n}</span>
              <div className="pr-ic">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;