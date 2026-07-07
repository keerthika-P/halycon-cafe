import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/orders';

export default function Checkout() {
  const { items, total, emptyCart } = useCart();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    if (!address || !phone) { setError('Please fill in delivery details.'); return; }
    setPlacing(true);
    try {
      const order = await placeOrder({ deliveryAddress: address, deliveryPhone: phone, paymentMethod });
      if (paymentMethod === 'RAZORPAY') {
        navigate(`/payment/${order.orderId}`);
      } else {
        navigate('/orders');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '50px 24px' }}>
      <h1 style={{ fontSize: 34, marginBottom: 30 }}>Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="Delivery Address">
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} style={inputStyle} placeholder="House / hostel, street, near KSREI..." />
        </Field>
        <Field label="Phone Number">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="10-digit mobile number" />
        </Field>
        <Field label="Payment Method">
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { v: 'RAZORPAY', l: 'Razorpay (Card/UPI/Wallet)' },
              { v: 'UPI_QR', l: 'UPI QR' },
              { v: 'COD', l: 'Cash on Delivery' },
            ].map((opt) => (
              <button type="button" key={opt.v} onClick={() => setPaymentMethod(opt.v)} style={{
                flex: 1, padding: '12px 10px', borderRadius: 12, fontSize: 12.5, fontWeight: 600,
                border: `1px solid ${paymentMethod === opt.v ? 'var(--gold)' : 'var(--border-glass)'}`,
                background: paymentMethod === opt.v ? 'rgba(212,175,55,0.12)' : 'transparent',
                color: paymentMethod === opt.v ? 'var(--gold)' : 'var(--text-secondary)',
              }}>{opt.l}</button>
            ))}
          </div>
        </Field>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--border-glass)' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Order Total ({items.length} items)</span>
          <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: 20 }}>₹{total}</span>
        </div>

        {error && <p style={{ color: '#F14C6B', fontSize: 13.5 }}>{error}</p>}

        <button type="submit" disabled={placing} style={{
          background: 'linear-gradient(120deg, #F5D77A, #D4AF37)', color: '#0B0F14', fontWeight: 800,
          padding: '15px 0', borderRadius: 999, fontSize: 15, opacity: placing ? 0.7 : 1,
        }}>{placing ? 'Placing order…' : 'Place Order'}</button>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
      {label}
      {children}
    </label>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', borderRadius: 12,
  padding: '12px 14px', color: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical',
};
