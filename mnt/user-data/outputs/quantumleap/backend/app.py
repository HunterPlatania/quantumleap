from flask import Flask, jsonify, request
from flask_cors import CORS
from quantum.circuit_builder import CircuitBuilder
from quantum.simulator import QuantumSimulator
from quantum.bloch_sphere import BlochSphereCalculator
import time

app = Flask(__name__)
CORS(app)

# Initialize quantum modules
circuit_builder = CircuitBuilder()
simulator = QuantumSimulator()
bloch_calculator = BlochSphereCalculator()

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0',
        'quantum_ready': True
    })

@app.route('/api/circuit/execute', methods=['POST'])
def execute_circuit():
    """Execute a quantum circuit and return results"""
    try:
        data = request.get_json()
        gates = data.get('gates', [])
        num_qubits = data.get('num_qubits', 2)
        shots = data.get('shots', 1024)
        
        # Build circuit from gate specifications
        circuit = circuit_builder.build_circuit(gates, num_qubits)
        
        # Execute circuit on simulator
        start_time = time.time()
        results = simulator.execute(circuit, shots)
        execution_time = time.time() - start_time
        
        # Calculate Bloch sphere coordinates
        bloch_vectors = bloch_calculator.calculate_bloch_coordinates(circuit, num_qubits)
        
        return jsonify({
            'success': True,
            'counts': results['counts'],
            'probabilities': results['probabilities'],
            'bloch_vectors': bloch_vectors,
            'execution_time': round(execution_time, 4),
            'circuit_depth': circuit.depth(),
            'num_gates': len(gates)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/gates', methods=['GET'])
def get_gates():
    """Get available quantum gates"""
    gates = {
        'single_qubit': [
            {
                'id': 'h',
                'name': 'Hadamard',
                'symbol': 'H',
                'description': 'Creates superposition',
                'color': '#4F46E5'
            },
            {
                'id': 'x',
                'name': 'Pauli-X',
                'symbol': 'X',
                'description': 'Bit flip (quantum NOT)',
                'color': '#DC2626'
            },
            {
                'id': 'y',
                'name': 'Pauli-Y',
                'symbol': 'Y',
                'description': 'Rotates around Y axis',
                'color': '#059669'
            },
            {
                'id': 'z',
                'name': 'Pauli-Z',
                'symbol': 'Z',
                'description': 'Phase flip',
                'color': '#7C3AED'
            }
        ],
        'two_qubit': [
            {
                'id': 'cx',
                'name': 'CNOT',
                'symbol': '⊕',
                'description': 'Controlled-NOT (creates entanglement)',
                'color': '#EA580C'
            }
        ]
    }
    return jsonify({'success': True, 'gates': gates})

@app.route('/api/tutorials', methods=['GET'])
def get_tutorials():
    """Get available tutorials"""
    tutorials = [
        {
            'id': 1,
            'title': 'Introduction to Superposition',
            'description': 'Learn how qubits can be in multiple states at once',
            'difficulty': 'beginner',
            'duration': '10 min'
        },
        {
            'id': 2,
            'title': 'Quantum Measurement',
            'description': 'Understand how measurement collapses quantum states',
            'difficulty': 'beginner',
            'duration': '8 min'
        },
        {
            'id': 3,
            'title': 'Quantum Entanglement',
            'description': 'Create and observe entangled qubits',
            'difficulty': 'intermediate',
            'duration': '15 min'
        },
        {
            'id': 4,
            'title': 'Bell States',
            'description': 'Explore the four maximally entangled states',
            'difficulty': 'intermediate',
            'duration': '12 min'
        },
        {
            'id': 5,
            'title': 'Quantum Gates Deep Dive',
            'description': 'Master all quantum gates and their effects',
            'difficulty': 'intermediate',
            'duration': '20 min'
        }
    ]
    return jsonify({'success': True, 'tutorials': tutorials})

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 QuantumLeap Backend Starting...")
    print("=" * 60)
    print("✅ Quantum simulator initialized")
    print("✅ Circuit builder ready")
    print("✅ Bloch sphere calculator ready")
    print("=" * 60)
    print("🌐 Server starting on http://localhost:5000")
    print("=" * 60)
    print("\n📝 Available endpoints:")
    print("  GET  /api/health")
    print("  POST /api/circuit/execute")
    print("  GET  /api/gates")
    print("  GET  /api/tutorials")
    print("\n💡 Press Ctrl+C to stop\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
