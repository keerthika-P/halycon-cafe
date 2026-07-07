import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategorySection from '../components/CategorySection';
import SearchFilter from '../components/SearchFilter';
import { getCategories, getMenu, searchMenu } from '../api/menu';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: '🔥 Trending', value: 'trending' },
  { label: '⭐ Popular', value: 'popular' },
  { label: '👨‍🍳 Chef Special', value: 'chef' },
  { label: 'Veg', value: 'veg' },
  { label: 'Non-Veg', value: 'nonveg' },
];

export default function Menu() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const initialFilter = searchParams.get('filter') || 'all';

  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const menuPromise = q ? searchMenu(q) : getMenu();
    Promise.all([getCategories(), menuPromise])
      .then(([cats, items]) => { setCategories(cats); setMenu(items); })
      .finally(() => setLoading(false));
  }, [q]);

  const filtered = useMemo(() => {
    switch (filter) {
      case 'trending': return menu.filter((m) => m.isTrending);
      case 'popular': return menu.filter((m) => m.isPopular);
      case 'chef': return menu.filter((m) => m.isChefSpecial);
      case 'veg': return menu.filter((m) => m.isVeg);
      case 'nonveg': return menu.filter((m) => !m.isVeg);
      default: return menu;
    }
  }, [menu, filter]);

  return (
    <div style={{ paddingTop: 30 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 10px' }}>
        <h1 style={{ fontSize: 40, marginBottom: 6 }}>{q ? `Results for "${q}"` : 'Full Menu'}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14.5 }}>Every category, one cinematic gallery.</p>
      </div>

      <SearchFilter filters={FILTERS} active={filter} onChange={setFilter} />

      {loading && <p style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading dishes…</p>}

      {!loading && q && (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 22 }}>
          {filtered.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No dishes matched your search.</p>}
        </div>
      )}

      {!loading && !q && categories
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((cat) => (
          <CategorySection key={cat.id} category={cat} items={filtered.filter((m) => m.categorySlug === cat.slug)} />
        ))}

      {!loading && q && (
        <CategorySection category={{ slug: 'search', name: `"${q}"`, description: '', themeColor: '#D4AF37' }} items={filtered} />
      )}
    </div>
  );
}
