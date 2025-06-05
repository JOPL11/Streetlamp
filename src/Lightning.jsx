import * as THREE from 'three';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';

//import { LightningStrike } from 'three/examples/jsm/geometries/LightningStrike';

function Cube({ position, color }) {
  return (
    <mesh position={position}>
      <dodecahedronGeometry />
      <meshStandardMaterial color={color} wireframe emissive={color} />
    </mesh>
  );
}

function Lightning({ params }) {
  const ref = useRef();
  useFrame((state, delta) => ref.current.update(delta));
  return (
    <mesh ref={ref}>
      <lightningStrike args={[params]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

function Scene() {
  const { camera, scene } = useThree();

  // Set up environment
  scene.background = new THREE.Color(0x000000);
  scene.add(new THREE.AmbientLight(0x404040));
  const light = new THREE.PointLight(0x00ffff, 1, 100);
  light.position.set(0, 15, 0);
  light.castShadow = true;
  scene.add(light);


  return (
    <>
      <mesh position={floorPosition} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={floorTexture} color={0xffffff} metalness={1} />
      </mesh>
      <Cube position={[-10, Math.abs(Math.sin(0 + 0.1) * 5), 5]} color={0xffffff} />
      <Cube position={[0, Math.abs(Math.sin(0 + 0.9) * 5), -12.5]} color={0xffffff} />
      <Cube position={[10, Math.abs(Math.sin(0 + 1.8) * 5), 5]} color={0xffffff} />
      <Suspense fallback={null}>
        <Lightning params={{ ...params, sourceOffset: new THREE.Vector3(), destOffset: new THREE.Vector3() }} />
        <Lightning params={{ ...params, sourceOffset: new THREE.Vector3(), destOffset: new THREE.Vector3() }} />
        <Lightning params={{ ...params, sourceOffset: new THREE.Vector3(), destOffset: new THREE.Vector3() }} />
      </Suspense>
      
      <Environment />
    </>
  );
}

function App() {
  return (
<>
      camera={{ position: [0, 3.75, 20], near: 0.1, far: 1000 }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      <Scene />
      </>
  );
}

export default App;