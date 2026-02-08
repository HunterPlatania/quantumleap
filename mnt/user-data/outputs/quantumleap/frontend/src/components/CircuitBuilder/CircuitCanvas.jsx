import React from 'react';
import './CircuitCanvas.css';

function CircuitCanvas({ gates }) {
  return (
    <div className="circuit-canvas">
      <div className="qubit-wire">
        <span className="qubit-label">q₀:</span>
        <div className="wire-line">
          {gates.filter(g => g.qubit === 0).map((gate, idx) => (
            <div key={gate.id} className={`gate-display gate-${gate.type}`}>
              {gate.type.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      
      <div className="qubit-wire">
        <span className="qubit-label">q₁:</span>
        <div className="wire-line">
          {gates.filter(g => g.qubit === 1).map((gate, idx) => (
            <div key={gate.id} className={`gate-display gate-${gate.type}`}>
              {gate.type.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {gates.length === 0 && (
        <div className="empty-message">
          Click gate buttons above to add gates to the circuit
        </div>
      )}
    </div>
  );
}

export default CircuitCanvas;
