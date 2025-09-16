
import { Html } from '@react-three/drei';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-cyan-300">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg tracking-wider" style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.7)' }}>
            INITIALISATION DU MOTEUR TEMPS RÉEL...
        </p>
      </div>
    </Html>
  );
};

export default Loader;
