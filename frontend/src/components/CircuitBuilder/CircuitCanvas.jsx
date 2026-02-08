import React, { useState } from 'react';
import './CircuitCanvas.css';

const GATES = [
  { id: 'h', name: 'H', color: '#4F46E5', description: 'Hadamard' },
  { id: 'x', name: 'X', color: '#DC2626', description: 'Pauli-X' },
  { id: 'y', name: 'Y', color: '#059669', description: 'Pauli-Y' },
  { id: 'z', name: 'Z', color: '#7C3AED', description: 'Pauli-Z' },
  { id: 'cx', name: 'CNOT', color: '#EA580C', description: 'Controlled-NOT', twoQubit: true }
];

function CircuitBuilder({ gates, setGates }) {
  const [selectedGate, setSelectedGate] = useState(null);
  const [selectedQubit, setSelectedQubit] = useState(0);
  const [controlQubit, setControlQubit] = useState(0);

  const addGate = (gateType) => {
    const gate = GATES.find(g => g.id === gateType);
    
    if (gate.twoQubit) {
      setGates([...gates, { 
        type: gateType, 
        control: controlQubit, 
        target: selectedQubit === controlQubit ? (selectedQubit + 1) % 2 : selectedQubit
      }]);
    } else {
      setGates([...gates, { type: gateType, qubit: selectedQubit }]);
    }
  };

  const clearCircuit = () => {
    setGates([]);
  };

  return (
    <div className="circuit-builder">
      <h2>Build Your Circuit</h2>
      
      <div className="gate-palette">
        <h3>Gates</h3>
        {GATES.map(gate => (
          <button
            key={gate.id}
            className="gate-button"
            style={{ backgroundColor: gate.color }}
            onClick={() => addGate(gate.id)}
            title={gate.description}
          >
            {gate.name}
          </button>
        ))}
      </div>

      <div className="qubit-selector">
        <h3>Target Qubit</h3>
        <select value={selectedQubit} onChange={(e) => setSelectedQubit(Number(e.target.value))}>
          <option value={0}>Qubit 0</option>
          <option value={1}>Qubit 1</option>
        </select>
      </div>

      <div className="circuit-display">
        <h3>Current Circuit</h3>
        <div className="qubit-wires">
          <div className="wire">
            <span>q[0]:</span>
            <div className="wire-line">
              {gates.filter(g => g.qubit === 0 || g.control === 0 || g.target === 0).map((gate, idx) => (
                <div key={idx} className="gate-on-wire" style={{ 
                  backgroundColor: GATES.find(g => g.id === gate.type)?.color 
                }}>
                  {gate.type.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
          <div className="wire">
            <span>q[1]:</span>
            <div className="wire-line">
              {gates.filter(g => g.qubit === 1 || g.control === 1 || g.target === 1).map((gate, idx) => (
                <div key={idx} className="gate-on-wire" style={{ 
                  backgroundColor: GATES.find(g => g.id === gate.type)?.color 
                }}>
                  {gate.type.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="clear-button" onClick={clearCircuit}>Clear Circuit</button>
      </div>

      <div className="gate-count">
        <p>Gates: {gates.length}</p>
      </div>
    </div>
  );
}

export default CircuitBuilder;
