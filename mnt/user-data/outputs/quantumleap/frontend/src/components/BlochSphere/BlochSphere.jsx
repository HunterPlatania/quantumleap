import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function BlochSphereModel({ vector }) {
  const arrowRef = useRef();

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />

      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#4f46e5" 
          transparent 
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* X axis (blue) */}
      <arrowHelper
        args={[
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          1.2,
          0x3b82f6,
          0.2,
          0.1
        ]}
      />
      <arrowHelper
        args={[
          new THREE.Vector3(-1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          1.2,
          0x3b82f6,
          0.2,
          0.1
        ]}
      />

      {/* Y axis (green) */}
      <arrowHelper
        args={[
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 0),
          1.2,
          0x10b981,
          0.2,
          0.1
        ]}
      />
      <arrowHelper
        args={[
          new THREE.Vector3(0, -1, 0),
          new THREE.Vector3(0, 0, 0),
          1.2,
          0x10b981,
          0.2,
          0.1
        ]}
      />

      {/* Z axis (purple) */}
      <arrowHelper
        args={[
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(0, 0, 0),
          1.2,
          0x8b5cf6,
          0.2,
          0.1
        ]}
      />
      <arrowHelper
        args={[
          new THREE.Vector3(0, 0, -1),
          new THREE.Vector3(0, 0, 0),
          1.2,
          0x8b5cf6,
          0.2,
          0.1
        ]}
      />

      {/* State vector (red) */}
      <arrowHelper
        ref={arrowRef}
        args={[
          new THREE.Vector3(vector.x, vector.z, vector.y).normalize(),
          new THREE.Vector3(0, 0, 0),
          1,
          0xef4444,
          0.3,
          0.15
        ]}
      />

      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={5}
      />
    </>
  );
}

function BlochSphere({ vector }) {
  return (
    <div style={{ width: '100%', height: '350px' }}>
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <BlochSphereModel vector={vector} />
      </Canvas>
    </div>
  );
}

function arrowHelper({ args }) {
  const [direction, origin, length, color, headLength, headWidth] = args;
  return <primitive object={new THREE.ArrowHelper(direction, origin, length, color, headLength, headWidth)} />;
}

export default BlochSphere;
