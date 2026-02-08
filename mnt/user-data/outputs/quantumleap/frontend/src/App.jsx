import React, { useState } from 'react';
import axios from 'axios';
import CircuitCanvas from './components/CircuitBuilder/CircuitCanvas';
import BlochSphere from './components/BlochSphere/BlochSphere';
import MeasurementResults from './components/Results/MeasurementResults';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [gates, setGates] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blochVectors, setBlochVectors] = useState([{ qubit: 0, x: 0, y: 0, z: 1 }]);

  const addGate = (gateType, qubit = 0) => {
    const newGate = {
      id: Date.now(),
      type: gateType,
      qubit: qubit
    };
    setGates([...gates, newGate]);
  };

  const clearCircuit = () => {
    setGates([]);
    setResults(null);
    setBlochVectors([{ qubit: 0, x: 0, y: 0, z: 1 }]);
  };

  const runCircuit = async () => {
    if (gates.length === 0) {
      alert('Please add at least one gate!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/circuit/execute`, {
        gates: gates,
        num_qubits: 2,
        shots: 1024
      });

      if (response.data.success) {
        setResults(response.data);
        setBlochVectors(response.data.bloch_vectors);
      }
    } catch (error) {
      console.error('Error running circuit:', error);
      alert('Error running circuit. Make sure backend is running!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚛️ QuantumLeap</h1>
        <p>Interactive Quantum Computing Education</p>
      </header>

      <div className="app-content">
        <div className="left-panel">
          <div className="section">
            <h2>Quantum Gates</h2>
            <div className="gate-palette">
              <button
                className="gate-button gate-h"
                onClick={() => addGate('h', 0)}
                title="Hadamard - Creates superposition"
              >
                H
              </button>
              <button
                className="gate-button gate-x"
                onClick={() => addGate('x', 0)}
                title="Pauli-X - Quantum NOT gate"
              >
                X
              </button>
              <button
                className="gate-button gate-y"
                onClick={() => addGate('y', 0)}
                title="Pauli-Y - Rotates around Y axis"
              >
                Y
              </button>
              <button
                className="gate-button gate-z"
                onClick={() => addGate('z', 0)}
                title="Pauli-Z - Phase flip"
              >
                Z
              </button>
              <button
                className="gate-button gate-cx"
                onClick={() => addGate('cx', 0)}
                title="CNOT - Creates entanglement"
              >
                ⊕
              </button>
            </div>
          </div>

          <div className="section">
            <h2>Circuit</h2>
            <CircuitCanvas gates={gates} />
            <div className="circuit-info">
              Gates: {gates.length}
            </div>
          </div>

          <div className="section">
            <div className="controls">
              <button
                className="btn btn-primary"
                onClick={runCircuit}
                disabled={loading || gates.length === 0}
              >
                {loading ? '⚙️ Running...' : '▶️ Run Circuit'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={clearCircuit}
                disabled={gates.length === 0}
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          {results && (
            <div className="section">
              <MeasurementResults results={results} />
            </div>
          )}
        </div>

        <div className="right-panel">
          <div className="section bloch-section">
            <h2>Bloch Sphere (Qubit 0)</h2>
            <BlochSphere vector={blochVectors[0]} />
            <div className="bloch-info">
              <p>x: {blochVectors[0].x.toFixed(3)}</p>
              <p>y: {blochVectors[0].y.toFixed(3)}</p>
              <p>z: {blochVectors[0].z.toFixed(3)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
