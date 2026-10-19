import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('demoUser', JSON.stringify(form));
    localStorage.setItem('loggedIn', 'true');
    navigate('/shop');
  };

  return (
    <div className="auth-page page-offset">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <p className="auth-note">Demo only, no real accounts.</p>

        <label htmlFor="name">Name</label>
        <input id="name" name="name" required
               value={form.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required
               value={form.email} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={4}
               value={form.password} onChange={handleChange} />

        <button type="submit">Sign up</button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;