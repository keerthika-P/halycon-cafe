import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import CategorySection from '../components/CategorySection';
import { getCategories, getMenu } from '../api/menu';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getMenu()])
      .then(([cats, items]) => { setCategories(cats); setMenu(items); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const trending = menu.filter((m) => m.isTrending);

  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '86vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <ParticleBackground color="#D4AF37" count={44} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            style={{ color: 'var(--gold)', letterSpacing: '0.3em', fontSize: 12.5, fontWeight: 700, marginBottom: 18 }}
          >NEAR KSREI · KSR KALVI NAGAR</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.22,1,0.36,1] }}
            style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1.02, maxWidth: 900 }}
          >
            A cinematic <span style={{ color: 'var(--gold)' }}>dark luxury</span><br/>café experience.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}
            style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 520, margin: '22px 0 34px' }}
          >
            Fresh juices, milk specials, filter coffee, mojitos and chef signatures — plated for the eye, built for delivery.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} style={{ display: 'flex', gap: 16 }}>
            <Link to="/menu" style={{
              background: 'linear-gradient(120deg, #F5D77A, #D4AF37)', color: '#0B0F14', fontWeight: 800,
              padding: '14px 30px', borderRadius: 999, fontSize: 14.5, boxShadow: 'var(--shadow-glow-gold)',
            }}>Explore the Menu</Link>
            <a href="#trending" style={{
              border: '1px solid var(--border-glass)', color: '#fff', padding: '14px 30px', borderRadius: 999, fontSize: 14.5,
            }}>See what's trending</a>
          </motion.div>
        </div>
      </section>

      {/* TRENDING STRIP */}
      <section id="trending" style={{ padding: '20px 24px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ width: 34, height: 2, background: 'var(--orange)' }} />
          <h2 style={{ fontSize: 28 }}>Trending Today</h2>
        </div>
      </section>

      {loading && <p style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading the menu…</p>}

      {!loading && trending.length > 0 && (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '10px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 22 }}>
          {trending.slice(0, 4).map((item) => (
            <Link key={item.id} to={`/food/${item.id}`} className="glass-card" style={{ padding: 14, display: 'block' }}>
              <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#fff', fontSize: 15 }}>{item.name}</span>
                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>₹{item.price}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* CATEGORY SECTIONS */}
      {!loading && categories
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((cat) => (
          <CategorySection key={cat.id} category={cat} items={menu.filter((m) => m.categorySlug === cat.slug).slice(0, 4)} />
        ))}

      {!loading && (
        <div style={{ textAlign: 'center', padding: '20px 24px 80px' }}>
          <Link to="/menu" style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 15, borderBottom: '1px solid var(--gold)', paddingBottom: 3 }}>
            View the full menu →
          </Link>
        </div>
      )}
    </div>
  );
}
