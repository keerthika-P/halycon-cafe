import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: 32, marginBottom: 26, textAlign: 'center' }}>Welcome Back</h1>
      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" style={inputStyle} required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" style={inputStyle} required />
        {error && <p style={{ color: '#F14C6B', fontSize: 13 }}>{error}</p>}
        <button disabled={loading} type="submit" style={btnStyle}>{loading ? 'Signing in…' : 'Sign In'}</button>
      </form>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 18, fontSize: 13.5 }}>
        New here? <Link to="/signup" style={{ color: 'var(--gold)' }}>Create an account</Link>
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
