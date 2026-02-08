import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

function BlochVector({ vector }) {
  if (!vector || vector.x === undefined) return null;
  
  const start = [0, 0, 0];
  const end = [vector.x, vector.y, vector.z];
  
  return (
    <group>
      <Line points={[start, end]} color="red" lineWidth={3} />
      <mesh position={end}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}

function Axes() {
  return (
    <group>
      <Line points={[[0,0,0], [1.5,0,0]]} color="blue" lineWidth={1} />
      <Line points={[[0,0,0], [0,1.5,0]]} color="green" lineWidth={1} />
      <Line points={[[0,0,0], [0,0,1.5]]} color="purple" lineWidth={1} />
      
      <mesh position={[1.6, 0, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position={[0, 0, 1.6]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color="purple" />
      </mesh>
    </group>
  );
}

function BlochSphere({ vectors = [] }) {
  return (
    <div style={{ width: '100%', height: '400px', background: '#0a0a0a' }}>
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial 
            color="#1a1a2e" 
            transparent 
            opacity={0.3} 
            wireframe 
          />
        </Sphere>
        
        <Axes />
        
        {vectors.map((vec, idx) => (
          <BlochVector key={idx} vector={vec} />
        ))}
        
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default BlochSphere;
