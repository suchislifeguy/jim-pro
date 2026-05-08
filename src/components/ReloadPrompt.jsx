import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

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
      <span style={{ fontSize: '0.9rem' }}>New version available</span>
      <button
        onClick={() => updateServiceWorker(true)}
        style={{
          background: '#7c3aed',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.35rem 0.85rem',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.85rem',
        }}
      >
        Reload
      </button>
      <button
        onClick={() => setNeedRefresh(false)}
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
