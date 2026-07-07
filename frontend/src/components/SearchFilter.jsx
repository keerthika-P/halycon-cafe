export default function SearchFilter({ filters, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: '0 24px 20px' }}>
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          style={{
            padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
            border: `1px solid ${active === f.value ? 'var(--gold)' : 'var(--border-glass)'}`,
            background: active === f.value ? 'rgba(212,175,55,0.15)' : 'var(--card-glass)',
            color: active === f.value ? 'var(--gold)' : 'var(--text-secondary)',
            transition: 'all 0.3s ease',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
