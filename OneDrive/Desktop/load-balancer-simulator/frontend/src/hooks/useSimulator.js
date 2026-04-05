/**
 * useSimulator – custom React hook
 * Encapsulates all API communication and state for the load balancer simulator.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const API = ''; // uses CRA proxy → http://localhost:5000

export default function useSimulator() {
  const [servers, setServers]           = useState([]);
  const [algorithm, setAlgorithmState]  = useState('round-robin');
  const [running, setRunning]           = useState(false);
  const [algorithmStats, setAlgStats]   = useState({});
  const [requestLog, setRequestLog]     = useState([]);  // last N dispatched events
  const [error, setError]               = useState(null);
  const pollRef = useRef(null);

  // ── Fetch current status from backend ──────────────────────────────────────
  const fetchStatus = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/status`);
      setServers(data.servers);
      setAlgorithmState(data.algorithm);
      setRunning(data.simulationRunning);
      setAlgStats(data.algorithmStats || {});
      setError(null);
    } catch (e) {
      setError('Cannot reach backend – make sure it is running on port 5000.');
    }
  }, []);

  // ── Poll every 600ms while component is mounted ─────────────────────────────
  useEffect(() => {
    fetchStatus();
    pollRef.current = setInterval(fetchStatus, 600);
    return () => clearInterval(pollRef.current);
  }, [fetchStatus]);

  // ── Actions ─────────────────────────────────────────────────────────────────

  const setAlgorithm = useCallback(async (alg) => {
    await axios.post(`${API}/set-algorithm`, { algorithm: alg });
    setAlgorithmState(alg);
  }, []);

  const generateTraffic = useCallback(async (count = 5) => {
    const { data } = await axios.post(`${API}/simulate`, { count });
    setRequestLog(prev => [
      { time: new Date().toLocaleTimeString(), ...data },
      ...prev.slice(0, 19),
    ]);
  }, []);

  const startSimulation = useCallback(async () => {
    await axios.post(`${API}/start-simulation`);
    setRunning(true);
  }, []);

  const stopSimulation = useCallback(async () => {
    await axios.post(`${API}/stop-simulation`);
    setRunning(false);
  }, []);

  const reset = useCallback(async () => {
    await axios.post(`${API}/reset`);
    setRequestLog([]);
    fetchStatus();
  }, [fetchStatus]);

  return {
    servers, algorithm, running, algorithmStats, requestLog, error,
    setAlgorithm, generateTraffic, startSimulation, stopSimulation, reset,
  };
}
