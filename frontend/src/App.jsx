import React, { useState } from 'react';
import CircuitBuilder from './components/CircuitBuilder/CircuitCanvas';
import BlochSphere from './components/BlochSphere/BlochSphere';
import Results from './components/Results/MeasurementResults';
import './App.css';

function App() {
  const [gates, setGates] = useState([]);
  const [results, setResults] = useState(null);
  const [blochVectors, setBlochVectors] = useState([{ qubit: 0, x: 0, y: 0, z: 1 }]);
  const [activeTab, setActiveTab] = useState('circuit');

  const executeCircuit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/circuit/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gates: gates,
          num_qubits: 2,
          shots: 1024
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setResults(data);
        setBlochVectors(data.bloch_vectors);
      }
    } catch (error) {
      console.error('Error executing circuit:', error);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>⚛️ QuantumLeap</h1>
        <p>Interactive Quantum Computing Simulator</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'circuit' ? 'active' : ''}
          onClick={() => setActiveTab('circuit')}
        >
          Circuit Builder
        </button>
        <button 
          className={activeTab === 'tutorials' ? 'active' : ''}
          onClick={() => setActiveTab('tutorials')}
        >
          Tutorials
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'circuit' && (
          <div className="circuit-view">
            <div className="left-panel">
              <CircuitBuilder gates={gates} setGates={setGates} />
              <button className="run-button" onClick={executeCircuit}>
                Run Circuit
              </button>
            </div>

            <div className="right-panel">
              <div className="bloch-container">
                <h3>Bloch Sphere</h3>
                <BlochSphere vectors={blochVectors} />
              </div>

              {results && (
                <div className="results-container">
                  <Results results={results} />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tutorials' && (
          <div className="tutorials-view">
            <h2>Interactive Tutorials</h2>
            <p>Coming soon: 5 interactive quantum computing tutorials</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;