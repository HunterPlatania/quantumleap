import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './MeasurementResults.css';

function MeasurementResults({ results }) {
  if (!results) return <div>Run a circuit to see results</div>;

  const chartData = Object.entries(results.counts).map(([state, count]) => ({
    state: state,
    count: count,
    probability: results.probabilities[state]
  }));

  return (
    <div className="results">
      <h3>Measurement Results</h3>
      
      <div className="stats">
        <p><strong>Total Shots:</strong> 1024</p>
        <p><strong>Execution Time:</strong> {results.execution_time}ms</p>
        <p><strong>Circuit Depth:</strong> {results.circuit_depth}</p>
      </div>

      <div className="chart-container">
        <BarChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </div>

      <div className="probabilities">
        <h4>Probabilities</h4>
        {Object.entries(results.probabilities).map(([state, prob]) => (
          <div key={state} className="prob-row">
            <span className="state">|{state}⟩</span>
            <span className="prob-value">{(prob * 100).toFixed(1)}%</span>
            <div className="prob-bar" style={{ width: `${prob * 100}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeasurementResults;
