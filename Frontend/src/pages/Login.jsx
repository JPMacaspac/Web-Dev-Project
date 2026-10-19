import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('demoUser') || 'null');

    if (!saved || saved.email !== form.email || saved.password !== form.password) {
      setError('Email or password is incorrect.');
      return;
    }
    localStorage.setItem('loggedIn', 'true');
    navigate('/shop');
  };

  return (
    <div className="auth-page page-offset">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p className="auth-note">Demo only, no real accounts.</p>

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required
               value={form.email} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required
               value={form.password} onChange={handleChange} />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit">Log in</button>
        <p className="auth-switch">
          No account yet? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;