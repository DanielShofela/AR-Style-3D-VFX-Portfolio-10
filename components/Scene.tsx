import React, { useRef } from 'react';
// Fix: Import THREE to resolve namespace error.
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import HolographicGlobe from './HolographicGlobe';

const Scene: React.FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.5) * 5;
      lightRef.current.position.y = Math.cos(clock.getElapsedTime() * 0.7) * 5;
      lightRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.3) * 5;
    }
  });

  return (
    <>
      <color attach="background" args={['#000010']} />
      <ambientLight intensity={0.1} color="#4f4f9f" />
      <pointLight ref={lightRef} intensity={2.5} color="#00ffff" distance={15} decay={2} />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#ff00ff" distance={15} decay={2} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <HolographicGlobe />

      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={3 * Math.PI / 4}
        autoRotate 
        autoRotateSpeed={0.2}
      />

      <EffectComposer>
        <Bloom 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9} 
            height={300} 
            intensity={1.2}
        />
      </EffectComposer>
    </>
  );
};

export default Scene;