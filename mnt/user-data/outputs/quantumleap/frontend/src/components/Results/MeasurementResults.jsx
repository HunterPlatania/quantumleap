import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './MeasurementResults.css';

function MeasurementResults({ results }) {
  if (!results) return null;

  // Convert results to chart data
  const chartData = Object.entries(results.probabilities).map(([state, prob]) => ({
    state: `|${state}⟩`,
    probability: (prob * 100).toFixed(1),
    count: results.counts[state]
  }));

  return (
    <div className="measurement-results">
      <h2>Measurement Results</h2>
      
      <div className="results-chart">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="state" 
              stroke="#94a3b8"
              style={{ fontSize: '0.9rem' }}
            />
            <YAxis 
              stroke="#94a3b8"
              style={{ fontSize: '0.9rem' }}
              label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
            />
            <Tooltip 
              contentStyle={{
                background: 'rgba(30, 41, 59, 0.95)',
                border: '1px solid rgba(79, 70, 229, 0.5)',
                borderRadius: '6px',
                color: '#e2e8f0'
              }}
            />
            <Bar dataKey="probability" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="results-table">
        {chartData.map((item) => (
          <div key={item.state} className="result-row">
            <span className="state-label">{item.state}</span>
            <div className="probability-bar">
              <div 
                className="probability-fill" 
                style={{ width: `${item.probability}%` }}
              />
            </div>
            <span className="probability-value">{item.probability}%</span>
            <span className="count-value">({item.count} shots)</span>
          </div>
        ))}
      </div>

      <div className="results-stats">
        <div className="stat">
          <span className="stat-label">Execution Time:</span>
          <span className="stat-value">{results.execution_time}s</span>
        </div>
        <div className="stat">
          <span className="stat-label">Circuit Depth:</span>
          <span className="stat-value">{results.circuit_depth}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Total Shots:</span>
          <span className="stat-value">1024</span>
        </div>
      </div>
    </div>
  );
}

export default MeasurementResults;
