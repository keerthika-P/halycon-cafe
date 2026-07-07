import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMenu } from '../api/menu';

/**
 * Minimal admin dashboard: menu overview + order status control would call
 * PATCH /api/orders/{id}/status (see backend OrderController). Full CRUD forms
 * for menu items can be wired to the same pattern used by MenuController.
 */
export default function Admin() {
  const { user } = useAuth();
  const [menu, setMenu] = useState([]);

  useEffect(() => { getMenu().then(setMenu); }, []);

  if (user?.role !== 'ADMIN') {
    return <p style={{ textAlign: 'center', padding: 80, color: 'var(--text-secondary)' }}>Admin access only.</p>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '50px 24px' }}>
      <h1 style={{ fontSize: 32, marginBottom: 26 }}>Admin Dashboard</h1>
      <div className="glass-card" style={{ padding: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: 13.5 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: 8 }}>Item</th><th>Category</th><th>Price</th><th>Available</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((m) => (
              <tr key={m.id} style={{ borderTop: '1px solid var(--border-glass)' }}>
                <td style={{ padding: 8 }}>{m.name}</td>
                <td>{m.categoryName}</td>
                <td>₹{m.price}</td>
                <td>{m.isAvailable ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
