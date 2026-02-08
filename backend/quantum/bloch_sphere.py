from qiskit.quantum_info import Statevector, Pauli
import numpy as np

class BlochSphereCalculator:
    """Calculates Bloch sphere coordinates from quantum states"""
    
    def calculate_bloch_coordinates(self, circuit, num_qubits=2):
        """
        Calculate Bloch sphere coordinates for each qubit
        
        Args:
            circuit: QuantumCircuit (before measurement)
            num_qubits: Number of qubits
            
        Returns:
            List of [x, y, z] coordinates for each qubit
        """
        # Remove measurements for statevector calculation
        circuit_no_measure = circuit.remove_final_measurements(inplace=False)
        
        # Get statevector
        statevector = Statevector.from_instruction(circuit_no_measure)
        
        # Calculate Bloch vectors for each qubit
        bloch_vectors = []
        
        for qubit_idx in range(num_qubits):
            # Get expectation values for Pauli operators
            x = self._expectation_x(statevector, qubit_idx, num_qubits)
            y = self._expectation_y(statevector, qubit_idx, num_qubits)
            z = self._expectation_z(statevector, qubit_idx, num_qubits)
            
            bloch_vectors.append({
                'qubit': qubit_idx,
                'x': round(float(x), 4),
                'y': round(float(y), 4),
                'z': round(float(z), 4)
            })
        
        return bloch_vectors
    
    def _expectation_x(self, statevector, qubit_idx, num_qubits):
        """Calculate expectation value of Pauli-X"""
        pauli_x = Pauli('I' * (num_qubits - qubit_idx - 1) + 'X' + 'I' * qubit_idx)
        return statevector.expectation_value(pauli_x).real
    
    def _expectation_y(self, statevector, qubit_idx, num_qubits):
        """Calculate expectation value of Pauli-Y"""
        pauli_y = Pauli('I' * (num_qubits - qubit_idx - 1) + 'Y' + 'I' * qubit_idx)
        return statevector.expectation_value(pauli_y).real
    
    def _expectation_z(self, statevector, qubit_idx, num_qubits):
        """Calculate expectation value of Pauli-Z"""
        pauli_z = Pauli('I' * (num_qubits - qubit_idx - 1) + 'Z' + 'I' * qubit_idx)
        return statevector.expectation_value(pauli_z).real
