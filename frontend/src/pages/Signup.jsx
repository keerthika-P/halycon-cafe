import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await signup(form.name, form.email, form.phone, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '70px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: 32, marginBottom: 26, textAlign: 'center' }}>Create Account</h1>
      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input value={form.name} onChange={update('name')} placeholder="Full Name" style={inputStyle} required />
        <input value={form.email} onChange={update('email')} type="email" placeholder="Email" style={inputStyle} required />
        <input value={form.phone} onChange={update('phone')} placeholder="Phone Number" style={inputStyle} />
        <input value={form.password} onChange={update('password')} type="password" placeholder="Password" style={inputStyle} required />
        {error && <p style={{ color: '#F14C6B', fontSize: 13 }}>{error}</p>}
        <button disabled={loading} type="submit" style={btnStyle}>{loading ? 'Creating account…' : 'Sign Up'}</button>
      </form>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 18, fontSize: 13.5 }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--gold)' }}>Sign in</Link>
      </p>
    </div>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', borderRadius: 12,
  padding: '13px 14px', color: '#fff', fontSize: 14, outline: 'none',
};
const btnStyle = {
  background: 'linear-gradient(120deg, #F5D77A, #D4AF37)', color: '#0B0F14', fontWeight: 800,
  padding: '14px 0', borderRadius: 999, fontSize: 14.5, border: 'none',
};
