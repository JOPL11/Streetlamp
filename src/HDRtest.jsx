import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { EffectsComposer, Bloom, EffectPass } from 'drei/postprocessing';

function Experience() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Cube />
      </Suspense>
      <EffectsComposer>
        <EffectPass attachArray="passes" args={[<Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} intensity={0.9} />]} />
      </EffectsComposer>
    </Canvas>
  );
}

export default Experience;