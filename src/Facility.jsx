import { useFrame, useThree, useLoader  } from '@react-three/fiber';
import * as dat from 'dat.gui';
import { useEffect, useCallback, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import gsap from '../public/resources/gsap/gsap-core.js';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

    //const emissiveTexture = use: THREE.TextureLoader('./emissive_texture.jpg');





const Facility = () => {

   
        const white = new THREE.MeshPhysicalMaterial({ 
          color: 0xECECEC,
          metalness: 0.5,
          roughness: 0.9,
          reflectivity: 0.5,
          clearcoat: 0.1,
          clearcoatRoughness: 0.2,
        });
      
    const objA = useLoader(OBJLoader, './22.obj');
    objA.traverse((child) => {
         if (child instanceof THREE.Mesh) {
         // Access the mesh
          const mesh = child;
         if (mesh.geometry) {
            if (mesh.name === "wall") {
              mesh.material = white; 
            } 
        }
      };
    });
      
        return (
          <>
           <primitive 
        object={objA} 
        scale={[0.025, 0.025, 0.025]}
        position={[0, 0 , 0]} 
        
        castShadow 
      />     
          </>
        );
      };
      
 

export default Facility;