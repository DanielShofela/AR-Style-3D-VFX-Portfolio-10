
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Loader from './Loader';

const CanvasContainer: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={<Loader />}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default CanvasContainer;
