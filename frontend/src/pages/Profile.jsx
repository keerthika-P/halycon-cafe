import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <div style={{ maxWidth: 500, margin: '60px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: 32, marginBottom: 26 }}>My Profile</h1>
      <div className="glass-card" style={{ padding: 24 }}>
        <Row label="Name" value={user?.name} />
        <Row label="Email" value={user?.email} />
        <Row label="Role" value={user?.role} />
        <button onClick={logout} style={{ marginTop: 20, background: 'none', border: '1px solid var(--border-glass)', color: 'var(--text-secondary)', borderRadius: 999, padding: '10px 20px' }}>
          Log Out
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-glass)' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>{label}</span>
      <span style={{ color: '#fff', fontSize: 14.5 }}>{value}</span>
    </div>
  );
}
