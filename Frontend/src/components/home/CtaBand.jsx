import { Link } from 'react-router-dom';
import './CtaBand.css';

function CtaBand() {
  return (
    <section className="band">
      <span className="band-eyebrow rv">Ready to treat yourself?</span>
      <h2 className="rv" style={{ '--d': '.1s' }}>Fresh cookies are one click away.</h2>
      <Link to="/shop" className="band-btn rv z" style={{ '--d': '.2s' }}>Shop now</Link>
    </section>
  );
}

export default CtaBand;