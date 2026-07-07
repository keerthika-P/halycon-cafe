export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '40px 24px', marginTop: 60 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)', marginBottom: 6 }}>HALYCON</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, maxWidth: 320 }}>
            Near KSREI, KSR Kalvi Nagar, Tamil Nadu — a cinematic dark luxury café experience.
          </p>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 12.5 }}>
          © {new Date().getFullYear()} Halycon Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
