from qiskit import transpile
from qiskit_aer import AerSimulator
from qiskit.quantum_info import Statevector
import time

class QuantumSimulator:
    def __init__(self):
        self.simulator = AerSimulator()
    
    def execute(self, circuit, shots=1024):
        start_time = time.time()
        
        if not any(instr.operation.name == 'measure' for instr in circuit.data):
            circuit.measure_all()
        
        transpiled = transpile(circuit, self.simulator)
        job = self.simulator.run(transpiled, shots=shots)
        result = job.result()
        counts = result.get_counts()
        
        probabilities = {state: count/shots for state, count in counts.items()}
        execution_time = time.time() - start_time
        
        return {
            'counts': dict(sorted(counts.items())),
            'probabilities': dict(sorted(probabilities.items())),
            'execution_time': round(execution_time * 1000, 2),
            'circuit_depth': circuit.depth()
        }
