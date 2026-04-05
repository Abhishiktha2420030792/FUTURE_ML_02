/**
 * RequestLog
 * Scrollable log of manually dispatched request batches.
 */
import React from 'react';
import './RequestLog.css';

export default function RequestLog({ log }) {
  if (!log?.length) return (
    <div className="request-log request-log--empty">
      <span>No requests yet. Hit "Send Req" or start the simulation.</span>
    </div>
  );

  return (
    <div className="request-log">
      <div className="rlog-header">
        <span>Request Log</span>
        <span className="mono">{log.length} events</span>
      </div>
      <ul className="rlog-list">
        {log.map((entry, i) => (
          <li key={i} className="rlog-item" style={{ animationDelay: `${i * 0.04}s` }}>
            <span className="mono rlog-time">{entry.time}</span>
            <span className="rlog-msg">{entry.message}</span>
            <span className="rlog-alg mono">{entry.algorithm}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
