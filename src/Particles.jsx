import * as THREE from 'three';
import { useFrame, useThree, useLoader  } from '@react-three/fiber';
import * as dat from 'dat.gui';
import { useEffect, useCallback, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import gsap from '../public/resources/gsap/gsap-core.js';


const Facility = () => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
  
    const gltf = useLoader(GLTFLoader, './interior_1.glb', (loader) => {
      loader.setDRACOLoader(dracoLoader);
    });
  
    return <primitive object={gltf.scene} />;
  }
  
  function App() {
    return (
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 1, 0]} intensity={11} />
        <Model position={[0, 0, 0]}/>
        <OrbitControls />
      </Canvas>
    );
  }
  

export default Facility;