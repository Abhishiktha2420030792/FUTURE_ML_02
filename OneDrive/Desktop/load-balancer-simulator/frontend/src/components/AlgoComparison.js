/**
 * AlgoComparison
 * Summary panel explaining each algorithm and showing which has handled more requests.
 */
import React from 'react';
import './AlgoComparison.css';

export default function AlgoComparison({ algorithmStats, current }) {
  const rr  = algorithmStats['round-robin']       || 0;
  const lc  = algorithmStats['least-connections'] || 0;
  const total = rr + lc || 1;

  return (
    <div className="algo-comparison">
      <h2 className="algo-comparison__title">Algorithm Comparison</h2>

      <div className="algo-cards">
        {/* Round Robin */}
        <div className={`algo-card ${current === 'round-robin' ? 'algo-card--active' : ''}`}>
          <div className="algo-card__top">
            <span className="algo-card__icon">⟳</span>
            <span className="algo-card__name">Round Robin</span>
            {current === 'round-robin' && <span className="algo-card__pill">ACTIVE</span>}
          </div>
          <p className="algo-card__desc">
            Rotates requests evenly across all servers in a fixed circular order.
            Best when servers have equal capacity and request cost is uniform.
          </p>
          <div className="algo-card__stat mono">{rr} requests</div>
          <div className="algo-bar-bg">
            <div className="algo-bar-fill algo-bar-fill--rr" style={{ width: `${(rr/total)*100}%` }} />
          </div>
          <div className="algo-card__pros-cons">
            <span className="pro">✓ Simple &amp; deterministic</span>
            <span className="con">✗ Ignores server load</span>
          </div>
        </div>

        {/* Least Connections */}
        <div className={`algo-card ${current === 'least-connections' ? 'algo-card--active' : ''}`}>
          <div className="algo-card__top">
            <span className="algo-card__icon">⚡</span>
            <span className="algo-card__name">Least Connections</span>
            {current === 'least-connections' && <span className="algo-card__pill">ACTIVE</span>}
          </div>
          <p className="algo-card__desc">
            Always picks the server with fewest active connections.
            Adapts dynamically to varying request durations and server capacity.
          </p>
          <div className="algo-card__stat mono">{lc} requests</div>
          <div className="algo-bar-bg">
            <div className="algo-bar-fill algo-bar-fill--lc" style={{ width: `${(lc/total)*100}%` }} />
          </div>
          <div className="algo-card__pros-cons">
            <span className="pro">✓ Load-aware routing</span>
            <span className="con">✗ Requires connection tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}
