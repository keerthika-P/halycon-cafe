import { useEffect, useState } from 'react';
import { getMyOrders } from '../api/orders';

const STATUS_STEPS = ['PLACED', 'PREPARING', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then(setOrders).finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>Loading your orders…</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '50px 24px' }}>
      <h1 style={{ fontSize: 34, marginBottom: 30 }}>Your Orders</h1>
      {orders.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>You haven't placed any orders yet.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {orders.map((o) => {
          const stepIndex = STATUS_STEPS.indexOf(o.status);
          return (
            <div key={o.orderId} className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#fff', fontWeight: 700 }}>Order #{o.orderId}</span>
                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>₹{o.totalAmount}</span>
              </div>

              <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
                {STATUS_STEPS.map((s, i) => (
                  <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= stepIndex ? 'var(--gold)' : 'var(--border-glass)' }} />
                ))}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 10 }}>Status: {o.status.replace(/_/g, ' ')} · Payment: {o.paymentStatus}</p>

              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-secondary)', fontSize: 13 }}>
                {o.items.map((it, i) => <li key={i}>{it.itemName} × {it.quantity} — ₹{it.priceAtOrder}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
