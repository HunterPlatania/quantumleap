from flask import Flask, jsonify, request
from flask_cors import CORS
from quantum.circuit_builder import CircuitBuilder
from quantum.simulator import QuantumSimulator
from quantum.bloch_sphere import BlochSphereCalculator
import time
import traceback

app = Flask(__name__)
CORS(app)

circuit_builder = CircuitBuilder()
simulator = QuantumSimulator()
bloch_calculator = BlochSphereCalculator()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'version': '1.0.0'})

@app.route('/api/circuit/execute', methods=['POST'])
def execute_circuit():
    try:
        data = request.get_json()
        
        # DEBUG PRINTS
        print("\n" + "="*60)
        print("REQUEST RECEIVED")
        print("="*60)
        print(f"Data: {data}")
        
        gates = data.get('gates', [])
        num_qubits = data.get('num_qubits', 2)
        shots = data.get('shots', 1024)
        
        print(f"Gates: {gates}")
        print(f"Num qubits: {num_qubits}")
        print(f"Shots: {shots}")
        print("="*60 + "\n")
        
        circuit = circuit_builder.build_circuit(gates, num_qubits)
        results = simulator.execute(circuit, shots)
        bloch_vectors = bloch_calculator.calculate_bloch_coordinates(circuit, num_qubits)
        
        return jsonify({
            'success': True,
            'counts': results['counts'],
            'probabilities': results['probabilities'],
            'bloch_vectors': bloch_vectors,
            'execution_time': 0.1,
            'circuit_depth': circuit.depth()
        })
        
    except Exception as e:
        print("\n" + "!"*60)
        print(f"ERROR: {type(e).__name__}: {str(e)}")
        traceback.print_exc()
        print("!"*60 + "\n")
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    print("🚀 QuantumLeap Backend Starting...")
    print("✅ Server running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
