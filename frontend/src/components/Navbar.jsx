import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, User, Menu as MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/menu?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(11,15,20,0.75)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700,
            background: 'linear-gradient(120deg, #F5D77A, #D4AF37)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '0.04em',
          }}>HALYCON</span>
        </Link>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', display: 'none' }}
          className="navbar-burger"
          aria-label="Toggle menu"
        >
          <MenuIcon size={22} />
        </button>

        <nav style={{ display: 'flex', gap: 22, marginLeft: 12, fontSize: 14.5, color: 'var(--text-secondary)' }} className="navbar-links">
          <Link to="/menu">Menu</Link>
          <Link to="/menu?filter=trending">Trending</Link>
          <Link to="/liked">Liked</Link>
          <Link to="/orders">Orders</Link>
        </nav>

        <form onSubmit={handleSearch} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }} className="navbar-search">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, background: 'var(--card-glass)',
            border: '1px solid var(--border-glass)', borderRadius: 999, padding: '8px 14px', width: 220,
          }}>
            <Search size={16} color="var(--text-secondary)" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: 13.5 }}
            />
          </div>
        </form>

        <Link to="/liked" aria-label="Liked items" style={{ color: 'var(--text-secondary)' }}>
          <Heart size={20} />
        </Link>

        <Link to="/cart" aria-label="Cart" style={{ position: 'relative', color: 'var(--text-secondary)' }}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: -8, right: -10, background: 'var(--gold)', color: '#0B0F14',
              fontSize: 10, fontWeight: 800, borderRadius: 999, padding: '1px 6px',
            }}>{cartCount}</span>
          )}
        </Link>

        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
              <User size={18} /> <span style={{ fontSize: 13.5 }}>{user?.name?.split(' ')[0]}</span>
            </Link>
            <button onClick={logout} style={{ background: 'none', border: '1px solid var(--border-glass)', color: 'var(--text-secondary)', borderRadius: 999, padding: '6px 12px', fontSize: 12.5 }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{
            background: 'linear-gradient(120deg, #F5D77A, #D4AF37)', color: '#0B0F14', fontWeight: 700,
            borderRadius: 999, padding: '8px 18px', fontSize: 13.5,
          }}>Sign In</Link>
        )}
      </div>
    </motion.header>
  );
}
