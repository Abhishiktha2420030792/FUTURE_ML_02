/**
 * Charts
 * Two Recharts panels:
 *   1. Bar chart – total request distribution across servers
 *   2. Line chart – active connections over time per server
 */
import React from 'react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './Charts.css';

// Palette cycling for lines/bars
const COLORS = ['#00d4ff', '#7b61ff', '#00e87a', '#ffb800', '#ff3d5a'];

// Custom tooltip styled for dark theme
const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Charts({ servers }) {
  if (!servers?.length) return null;

  // ── Dataset 1: total requests per server (bar) ────────────────────────────
  const distData = servers.map(s => ({
    name: s.id,
    Requests: s.totalRequests,
  }));

  // ── Dataset 2: connections over time (line) ───────────────────────────────
  // Transpose: array indexed by time point, each key = server id
  const historyLength = Math.max(...servers.map(s => s.history?.length || 0));
  const timeData = Array.from({ length: historyLength }, (_, i) => {
    const point = { name: servers[0]?.history?.[i]?.time || `t${i}` };
    servers.forEach(s => {
      point[s.id] = s.history?.[i]?.connections ?? 0;
    });
    return point;
  });

  return (
    <div className="charts">
      {/* Bar: Request Distribution */}
      <div className="chart-card">
        <h3 className="chart-title">Request Distribution</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={distData} margin={{ top: 8, right: 16, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#5a6a85', fontSize: 11, fontFamily: 'Space Mono' }} />
            <YAxis tick={{ fill: '#5a6a85', fontSize: 11, fontFamily: 'Space Mono' }} />
            <Tooltip content={<DarkTooltip />} />
            <Bar dataKey="Requests" radius={[4, 4, 0, 0]}>
              {distData.map((_, i) => (
                <rect key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
            {distData.map((entry, i) => (
              <Bar key={entry.name} dataKey="Requests" fill={COLORS[i % COLORS.length]}
                   radius={[4,4,0,0]} hide={i !== 0} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line: Connections Over Time */}
      <div className="chart-card">
        <h3 className="chart-title">Active Connections Over Time</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={timeData} margin={{ top: 8, right: 16, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#5a6a85', fontSize: 10, fontFamily: 'Space Mono' }}
                   interval="preserveStartEnd" />
            <YAxis tick={{ fill: '#5a6a85', fontSize: 11, fontFamily: 'Space Mono' }} />
            <Tooltip content={<DarkTooltip />} />
            <Legend wrapperStyle={{ fontSize: '0.72rem', fontFamily: 'Space Mono', color: '#5a6a85' }} />
            {servers.map((s, i) => (
              <Line
                key={s.id} type="monotone" dataKey={s.id}
                stroke={COLORS[i % COLORS.length]}
                dot={false} strokeWidth={2}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
