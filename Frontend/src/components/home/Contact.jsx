import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <section className="ct">
      <div className="ct-inner">
        <form className="ct-form rv l" onSubmit={handleSubmit}>
          <h3>Send us a message</h3>

          <label htmlFor="ct-name">Name</label>
          <input id="ct-name" placeholder="Your name" required />

          <label htmlFor="ct-email">Email</label>
          <input id="ct-email" type="email" placeholder="you@example.com" required />

          <label htmlFor="ct-msg">Message</label>
          <textarea id="ct-msg"
            placeholder="Tell us about your order or question. For custom or bulk orders, please include your event date." />

          <button className="sn-btn fill" type="submit">Send message</button>
          {sent && <p className="ct-ok">Thanks! This is a demo, so nothing was sent.</p>}
        </form>

        <div className="rv r">
          <span className="sn-eyebrow">Get in touch</span>
          <h2>Have a question or custom order?</h2>
          <p className="ct-sub">We'd love to hear from you.</p>

          <div className="ct-facts">
            <div><h4>Email</h4><p>hello@jaypssnackstack.com</p></div>
            <div><h4>Phone</h4><p>+63 912 345 6789</p></div>
            <div><h4>Hours</h4><p>Mon–Sat, 9:00 AM – 6:00 PM</p></div>
            <div><h4>Address</h4><p>123 Mabini Street, Batangas City</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;