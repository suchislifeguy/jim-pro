import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r);
      if (r) {
        setInterval(() => r.update(), 5 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  if (!offlineReady) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1e1b4b',
      color: '#fff',
      padding: '0.75rem 1.25rem',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    }}>
      <span style={{ fontSize: '0.9rem' }}>App ready to work offline</span>
      <button
        onClick={() => setOfflineReady(false)}
        style={{
          background: 'transparent',
          color: '#aaa',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
      >
        Dismiss
      </button>
    </div>
  );
}
