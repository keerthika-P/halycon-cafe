import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createRazorpayOrder, verifyPayment } from '../api/payments';
import { getOrder } from '../api/orders';

/**
 * Loads the Razorpay Checkout.js script and opens the payment sheet.
 * Requires a valid Razorpay Key ID configured on the backend (application.properties)
 * and a real Razorpay account to actually process a transaction.
 */
export default function Payment() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder(orderId).then(setOrder);
  }, [orderId]);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const startPayment = async () => {
    setStatus('processing');
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) { setStatus('error'); return; }

    const rzpOrder = await createRazorpayOrder(orderId);

    const options = {
      key: rzpOrder.razorpayKeyId,
      amount: Math.round(rzpOrder.amount * 100),
      currency: rzpOrder.currency,
      name: 'HALYCON CAFE',
      description: `Order #${orderId}`,
      order_id: rzpOrder.razorpayOrderId,
      handler: async (response) => {
        const verified = await verifyPayment({
          orderId: Number(orderId),
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });
        setStatus(verified ? 'success' : 'failed');
      },
      theme: { color: '#D4AF37' },
      modal: { ondismiss: () => setStatus('idle') },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setStatus('idle');
  };

  return (
    <div style={{ maxWidth: 480, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
      <h1 style={{ fontSize: 30, marginBottom: 16 }}>Complete Payment</h1>
      {order && <p style={{ color: 'var(--gold)', fontSize: 24, fontWeight: 800, marginBottom: 24 }}>₹{order.totalAmount}</p>}

      {status === 'success' ? (
        <div>
          <p style={{ color: '#22C55E', fontSize: 16, marginBottom: 20 }}>✓ Payment successful! Your order is confirmed.</p>
          <button onClick={() => navigate('/orders')} style={btnStyle}>View My Orders</button>
        </div>
      ) : status === 'failed' || status === 'error' ? (
        <div>
          <p style={{ color: '#F14C6B', fontSize: 15, marginBottom: 20 }}>Payment could not be verified. Please try again.</p>
          <button onClick={startPayment} style={btnStyle}>Retry Payment</button>
        </div>
      ) : (
        <button onClick={startPayment} disabled={status === 'processing'} style={{ ...btnStyle, opacity: status === 'processing' ? 0.7 : 1 }}>
          {status === 'processing' ? 'Opening secure checkout…' : 'Pay with Razorpay'}
        </button>
      )}

      <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 24 }}>
        Requires a live Razorpay Key ID/Secret configured on the backend to actually charge a card.
      </p>
    </div>
  );
}

const btnStyle = {
  background: 'linear-gradient(120deg, #F5D77A, #D4AF37)', color: '#0B0F14', fontWeight: 800,
  padding: '14px 34px', borderRadius: 999, fontSize: 14.5, border: 'none',
};
