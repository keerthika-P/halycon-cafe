import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import { useLikes } from '../context/LikesContext';

export default function Liked() {
  const { likedItems } = useLikes();

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '50px 24px' }}>
      <h1 style={{ fontSize: 36, marginBottom: 30 }}>Your Liked Dishes</h1>
      {likedItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>You haven't liked anything yet.</p>
          <Link to="/menu" style={{ color: 'var(--gold)', fontWeight: 700 }}>Browse the menu →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 22 }}>
          {likedItems.map((item) => <FoodCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
