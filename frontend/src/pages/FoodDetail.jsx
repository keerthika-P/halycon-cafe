import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Flame, ChefHat } from 'lucide-react';
import { getMenu } from '../api/menu';
import { useCart } from '../context/CartContext';
import { useLikes } from '../context/LikesContext';
import { useAuth } from '../context/AuthContext';

export default function FoodDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { likedIds, toggleLike } = useLikes();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    getMenu().then((items) => setItem(items.find((m) => String(m.id) === id)));
  }, [id]);

  if (!item) return <p style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>Loading dish…</p>;

  const liked = likedIds?.has(item.id);
  const glow = item.categoryThemeColor || '#D4AF37';

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '50px 24px' }}>
      <Link to="/menu" style={{ color: 'var(--text-secondary)', fontSize: 13.5 }}>← Back to menu</Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 46, marginTop: 24 }} className="food-detail-grid">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          style={{ borderRadius: 24, overflow: 'hidden', boxShadow: `0 0 60px -12px ${glow}66`, aspectRatio: '1/1' }}>
          <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {item.isTrending && <Tag icon={<Flame size={12} />} label="Trending" color="#F97316" />}
            {item.isChefSpecial && <Tag icon={<ChefHat size={12} />} label="Chef Special" color="#D4AF37" />}
          </div>
          <h1 style={{ fontSize: 40 }}>{item.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '10px 0 18px', color: 'var(--text-secondary)' }}>
            <Star size={15} fill="var(--gold)" color="var(--gold)" /> {item.rating} · {item.categoryName}
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 15 }}>{item.description}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5, marginTop: 10 }}>Ingredients: {item.ingredients}</p>
          {item.calories && <p style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>{item.calories} kcal</p>}

          <div style={{ fontSize: 32, color: 'var(--gold)', fontWeight: 700, margin: '26px 0' }}>₹{item.price}</div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-glass)', borderRadius: 999 }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ padding: '10px 16px', background: 'none', border: 'none', color: '#fff' }}>−</button>
              <span style={{ padding: '0 6px', color: '#fff' }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} style={{ padding: '10px 16px', background: 'none', border: 'none', color: '#fff' }}>+</button>
            </div>
            <button
              onClick={() => isAuthenticated && addItem(item.id, qty)}
              style={{ flex: 1, background: 'linear-gradient(120deg, #F5D77A, #D4AF37)', color: '#0B0F14', fontWeight: 800, padding: '14px 0', borderRadius: 999, fontSize: 14.5 }}
            >
              {isAuthenticated ? 'Add to Cart' : 'Sign in to order'}
            </button>
            <button onClick={() => isAuthenticated && toggleLike(item.id)} style={{
              width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--border-glass)', background: 'var(--card-glass)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Heart size={18} color={liked ? '#F14C6B' : '#fff'} fill={liked ? '#F14C6B' : 'none'} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Tag({ icon, label, color }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, border: `1px solid ${color}88`, color, borderRadius: 999, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>
      {icon} {label}
    </span>
  );
}
