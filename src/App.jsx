import React, { useState, useEffect } from 'react';
import AppV1 from './AppV1';
import AppV2 from './AppV2';

const VersionToggle = () => {
  const [version, setVersion] = useState('v2');
  const [minimised, setMinimised] = useState(true);

  // Keyboard shortcut: press V to toggle, M to minimise
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'v' || e.key === 'V') {
        setVersion(prev => prev === 'v1' ? 'v2' : 'v1');
      }
      if (e.key === 'm' || e.key === 'M') {
        setMinimised(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="relative">
      {/* ─── Floating A/B Toggle Panel ─── */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          fontFamily: "'Outfit', system-ui, sans-serif",
        }}
      >
        {minimised ? (
          <button
            onClick={() => setMinimised(false)}
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '24px',
              padding: '8px 16px',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              minHeight: '40px',
            }}
            aria-label="Show version toggle"
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: version === 'v1' ? '#f59e0b' : '#22d3ee',
            }} />
            {version === 'v1' ? 'V1' : 'V2'}
          </button>
        ) : (
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '16px',
              padding: '16px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              width: '280px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                A/B Version Compare
              </span>
              <button
                onClick={() => setMinimised(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '4px',
                  lineHeight: 1,
                  minHeight: 'auto',
                }}
                aria-label="Minimise toggle"
              >
                ─
              </button>
            </div>

            {/* Toggle buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '12px',
            }}>
              <button
                onClick={() => setVersion('v1')}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: version === 'v1' ? '2px solid #f59e0b' : '1px solid rgba(148, 163, 184, 0.2)',
                  background: version === 'v1' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                  color: version === 'v1' ? '#fbbf24' : '#94a3b8',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  minHeight: '44px',
                }}
                aria-pressed={version === 'v1'}
              >
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '2px' }}>V1 — Original</div>
                <div style={{ fontSize: '10px', opacity: 0.7 }}>Desktop-focused</div>
              </button>

              <button
                onClick={() => setVersion('v2')}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: version === 'v2' ? '2px solid #22d3ee' : '1px solid rgba(148, 163, 184, 0.2)',
                  background: version === 'v2' ? 'rgba(34, 211, 238, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                  color: version === 'v2' ? '#67e8f9' : '#94a3b8',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  minHeight: '44px',
                }}
                aria-pressed={version === 'v2'}
              >
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '2px' }}>V2 — Responsive</div>
                <div style={{ fontSize: '10px', opacity: 0.7 }}>Mobile + WCAG AA</div>
              </button>
            </div>

            {/* Version info */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '8px',
              padding: '10px 12px',
              marginBottom: '10px',
            }}>
              {version === 'v1' ? (
                <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5' }}>
                  <span style={{ color: '#fbbf24', fontWeight: '600' }}>V1 Original</span> — Desktop-optimised layout with fixed grid columns. Glass morphism UI with full animations.
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5' }}>
                  <span style={{ color: '#67e8f9', fontWeight: '600' }}>V2 Responsive</span> — Mobile-first (375px+), WCAG 2.1 AA compliant. Skip nav, ARIA, keyboard support, reduced motion.
                </div>
              )}
            </div>

            {/* Keyboard shortcuts */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <span style={{ fontSize: '10px', color: '#64748b' }}>
                <kbd style={{
                  background: 'rgba(51, 65, 85, 0.8)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid rgba(100, 116, 139, 0.3)',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  marginRight: '4px',
                }}>V</kbd>
                toggle
              </span>
              <span style={{ fontSize: '10px', color: '#64748b' }}>
                <kbd style={{
                  background: 'rgba(51, 65, 85, 0.8)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid rgba(100, 116, 139, 0.3)',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  marginRight: '4px',
                }}>M</kbd>
                minimise
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ─── Render Active Version ─── */}
      {version === 'v1' ? <AppV1 /> : <AppV2 />}
    </div>
  );
};

export default VersionToggle;
