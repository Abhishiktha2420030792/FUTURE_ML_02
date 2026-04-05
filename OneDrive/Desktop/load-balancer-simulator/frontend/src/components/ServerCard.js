/**
 * ServerCard
 * Displays a single server's metrics with animated load bar and status badge.
 */
import React from 'react';
import './ServerCard.css';

const OVERLOAD_THRESHOLD = 10;

export default function ServerCard({ server }) {
  const { id, activeConnections, totalRequests, isOverloaded, responseTime } = server;

  // 0–100 fill for the load bar
  const loadPct = Math.min((activeConnections / (OVERLOAD_THRESHOLD * 1.5)) * 100, 100);

  const status = isOverloaded ? 'overloaded' : activeConnections > 5 ? 'busy' : 'healthy';
  const statusLabels = { healthy: '● HEALTHY', busy: '● BUSY', overloaded: '▲ OVERLOADED' };

  return (
    <div className={`server-card server-card--${status}`}>
      {/* Pulse ring for overloaded servers */}
      {isOverloaded && <span className="pulse-ring" />}

      <div className="server-card__header">
        <span className="server-card__id mono">{id}</span>
        <span className={`server-card__badge badge--${status}`}>{statusLabels[status]}</span>
      </div>

      {/* Load bar */}
      <div className="server-card__bar-bg">
        <div
          className={`server-card__bar-fill bar--${status}`}
          style={{ width: `${loadPct}%` }}
        />
      </div>

      {/* Metrics grid */}
      <div className="server-card__metrics">
        <div className="metric">
          <span className="metric__label">Active</span>
          <span className={`metric__value mono ${isOverloaded ? 'text-danger' : ''}`}>
            {activeConnections}
          </span>
        </div>
        <div className="metric">
          <span className="metric__label">Total Req</span>
          <span className="metric__value mono">{totalRequests}</span>
        </div>
        <div className="metric">
          <span className="metric__label">Avg RT</span>
          <span className="metric__value mono">{responseTime || '—'}<small>ms</small></span>
        </div>
        <div className="metric">
          <span className="metric__label">Load</span>
          <span className="metric__value mono">{loadPct.toFixed(0)}%</span>
        </div>
      </div>

      {/* Animated request particles when busy */}
      {activeConnections > 0 && (
        <div className="server-card__particles">
          {Array.from({ length: Math.min(activeConnections, 6) }).map((_, i) => (
            <span key={i} className="particle" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      )}
    </div>
  );
}
