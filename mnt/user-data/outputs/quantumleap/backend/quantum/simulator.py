from qiskit_aer import AerSimulator

class QuantumSimulator:
    """Executes quantum circuits using Qiskit Aer simulator"""
    
    def __init__(self):
        self.simulator = AerSimulator()
    
    def execute(self, circuit, shots=1024):
        """
        Execute a quantum circuit
        
        Args:
            circuit: QuantumCircuit to execute
            shots: Number of measurement shots
            
        Returns:
            Dictionary with counts and probabilities
        """
        # Run simulation
        job = self.simulator.run(circuit, shots=shots)
        result = job.result()
        counts = result.get_counts()
        
        # Calculate probabilities
        probabilities = {state: count/shots for state, count in counts.items()}
        
        return {
            'counts': counts,
            'probabilities': probabilities
        }
