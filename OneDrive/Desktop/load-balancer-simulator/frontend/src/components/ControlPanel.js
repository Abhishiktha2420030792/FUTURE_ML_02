/**
 * ControlPanel
 * Algorithm selector, Start/Stop simulation, Generate Traffic, and Reset buttons.
 */
import React, { useState } from 'react';
import './ControlPanel.css';

export default function ControlPanel({
  algorithm, running,
  onSetAlgorithm, onStart, onStop, onGenerate, onReset,
}) {
  const [trafficCount, setTrafficCount] = useState(5);

  return (
    <div className="control-panel">
      <div className="cp-section">
        <label className="cp-label">Algorithm</label>
        <div className="cp-tabs">
          {['round-robin', 'least-connections'].map(alg => (
            <button
              key={alg}
              className={`cp-tab ${algorithm === alg ? 'cp-tab--active' : ''}`}
              onClick={() => onSetAlgorithm(alg)}
            >
              {alg === 'round-robin' ? '⟳ Round Robin' : '⚡ Least Connections'}
            </button>
          ))}
        </div>
      </div>

      <div className="cp-divider" />

      <div className="cp-section">
        <label className="cp-label">Simulation</label>
        <div className="cp-buttons">
          {!running ? (
            <button className="cp-btn cp-btn--success" onClick={onStart}>
              ▶ Start Auto
            </button>
          ) : (
            <button className="cp-btn cp-btn--danger" onClick={onStop}>
              ■ Stop Auto
            </button>
          )}
          <button className="cp-btn cp-btn--ghost" onClick={onReset}>
            ↺ Reset
          </button>
        </div>
      </div>

      <div className="cp-divider" />

      <div className="cp-section">
        <label className="cp-label">Manual Traffic</label>
        <div className="cp-traffic-row">
          <input
            className="cp-number"
            type="number" min="1" max="20"
            value={trafficCount}
            onChange={e => setTrafficCount(Number(e.target.value))}
          />
          <button
            className="cp-btn cp-btn--primary"
            onClick={() => onGenerate(trafficCount)}
          >
            Send {trafficCount} Req
          </button>
        </div>
        {/* Quick presets */}
        <div className="cp-presets">
          {[1, 5, 10, 20].map(n => (
            <button key={n} className="cp-preset" onClick={() => { setTrafficCount(n); onGenerate(n); }}>
              ×{n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
