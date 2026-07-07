import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, total, updateQuantity, removeItem, loading } = useCart();
  const navigate = useNavigate();

  if (loading) return <p style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>Loading your cart…</p>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '50px 24px' }}>
      <h1 style={{ fontSize: 36, marginBottom: 30 }}>Your Cart</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Your cart is empty.</p>
          <Link to="/menu" style={{ color: 'var(--gold)', fontWeight: 700 }}>Browse the menu →</Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {items.map((ci, i) => (
              <motion.div key={ci.cartItemId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 14 }}>
                <img src={ci.imageUrl} alt={ci.name} style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: 16 }}>{ci.name}</div>
                  <div style={{ color: 'var(--gold)', fontSize: 14 }}>₹{ci.price}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-glass)', borderRadius: 999 }}>
                  <button onClick={() => updateQuantity(ci.menuItemId, ci.quantity - 1)} style={{ padding: '6px 12px', background: 'none', border: 'none', color: '#fff' }}>−</button>
                  <span style={{ color: '#fff', padding: '0 4px' }}>{ci.quantity}</span>
                  <button onClick={() => updateQuantity(ci.menuItemId, ci.quantity + 1)} style={{ padding: '6px 12px', background: 'none', border: 'none', color: '#fff' }}>+</button>
                </div>
                <div style={{ width: 80, textAlign: 'right', color: '#fff', fontWeight: 700 }}>₹{ci.subtotal}</div>
                <button onClick={() => removeItem(ci.menuItemId)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="glass-card" style={{ marginTop: 30, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13.5 }}>Total</div>
              <div style={{ fontSize: 28, color: 'var(--gold)', fontWeight: 800 }}>₹{total}</div>
            </div>
            <button onClick={() => navigate('/checkout')} style={{
              background: 'linear-gradient(120deg, #F5D77A, #D4AF37)', color: '#0B0F14', fontWeight: 800,
              padding: '14px 32px', borderRadius: 999, fontSize: 14.5,
            }}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
