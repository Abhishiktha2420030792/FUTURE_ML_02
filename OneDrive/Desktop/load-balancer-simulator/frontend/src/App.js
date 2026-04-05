/**
 * App.js – Root component for the Load Balancer Simulator
 * Composes all panels into the dashboard layout.
 */
import React from 'react';
import './App.css';
import useSimulator from './hooks/useSimulator';
import ServerCard    from './components/ServerCard';
import ControlPanel  from './components/ControlPanel';
import Charts        from './components/Charts';
import AlgoComparison from './components/AlgoComparison';
import RequestLog    from './components/RequestLog';

export default function App() {
  const {
    servers, algorithm, running, algorithmStats, requestLog, error,
    setAlgorithm, generateTraffic, startSimulation, stopSimulation, reset,
  } = useSimulator();

  // Summary stats for header strip
  const totalReq = servers.reduce((s, sv) => s + sv.totalRequests, 0);
  const totalActive = servers.reduce((s, sv) => s + sv.activeConnections, 0);
  const overloaded  = servers.filter(s => s.isOverloaded).length;

  return (
    <div className="app">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="app-header__left">
          <span className="app-header__logo">⬡</span>
          <div>
            <h1 className="app-header__title">Load Balancer</h1>
            <span className="app-header__sub mono">Strategy Simulator</span>
          </div>
        </div>

        <div className="app-header__stats">
          <Stat label="Total Requests"    value={totalReq}    />
          <Stat label="Active Connections" value={totalActive}  />
          <Stat label="Overloaded"         value={overloaded}   danger={overloaded > 0} />
          <div className={`status-badge ${running ? 'status-badge--running' : ''}`}>
            <span className="status-dot" />
            {running ? 'RUNNING' : 'IDLE'}
          </div>
        </div>
      </header>

      {/* ── Error banner ──────────────────────────────────────────────── */}
      {error && <div className="error-banner">⚠ {error}</div>}

      {/* ── Main content ──────────────────────────────────────────────── */}
      <main className="app-main">

        {/* Left column: controls + log */}
        <aside className="app-aside">
          <ControlPanel
            algorithm={algorithm}
            running={running}
            onSetAlgorithm={setAlgorithm}
            onStart={startSimulation}
            onStop={stopSimulation}
            onGenerate={generateTraffic}
            onReset={reset}
          />
          <RequestLog log={requestLog} />
        </aside>

        {/* Right column: servers + charts + comparison */}
        <div className="app-content">
          {/* Server grid */}
          <section className="section">
            <h2 className="section-title">
              Server Pool
              <span className="section-count mono">{servers.length} nodes</span>
            </h2>
            <div className="server-grid">
              {servers.map(server => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </section>

          {/* Charts */}
          <section className="section">
            <h2 className="section-title">Analytics</h2>
            <Charts servers={servers} />
          </section>

          {/* Algorithm comparison */}
          <AlgoComparison algorithmStats={algorithmStats} current={algorithm} />
        </div>

      </main>
    </div>
  );
}

/** Mini stat chip for header */
function Stat({ label, value, danger }) {
  return (
    <div className="header-stat">
      <span className="header-stat__label">{label}</span>
      <span className={`header-stat__value mono ${danger ? 'text-danger' : ''}`}>{value}</span>
    </div>
  );
}
