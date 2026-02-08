from qiskit import QuantumCircuit

class CircuitBuilder:
    """Builds quantum circuits from gate specifications"""
    
    def build_circuit(self, gates, num_qubits=2):
        """
        Build a quantum circuit from a list of gate specifications
        
        Args:
            gates: List of dicts with 'type' and 'qubit' keys
            num_qubits: Number of qubits in circuit
            
        Returns:
            QuantumCircuit object
        """
        circuit = QuantumCircuit(num_qubits, num_qubits)
        
        for gate in gates:
            gate_type = gate['type']
            qubit = gate['qubit']
            
            if gate_type == 'h':
                circuit.h(qubit)
            elif gate_type == 'x':
                circuit.x(qubit)
            elif gate_type == 'y':
                circuit.y(qubit)
            elif gate_type == 'z':
                circuit.z(qubit)
            elif gate_type == 'cx':
                control = gate.get('control', 0)
                target = gate.get('target', 1)
                circuit.cx(control, target)
        
        # Add measurements
        circuit.measure_all()
        
        return circuit
