import { motion } from 'framer-motion';
import FoodCard from './FoodCard';

export default function CategorySection({ category, items }) {
  if (!items?.length) return null;
  return (
    <section style={{ padding: '60px 24px', position: 'relative' }} id={category.slug}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}
        >
          <span style={{ width: 34, height: 2, background: category.themeColor }} />
          <h2 style={{ fontSize: 32, color: '#fff' }}>{category.name}</h2>
          <span style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>{category.description}</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 22 }}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <FoodCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
