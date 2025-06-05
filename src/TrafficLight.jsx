import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial, BakeShadows, Html} from '@react-three/drei';
import { DepthOfField, Bloom, Noise, ChromaticAberration, ToneMapping, Vignette, EffectComposer } from '@react-three/postprocessing';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial } from 'three'; 
import * as THREE from 'three'; 


const grey = new THREE.MeshPhysicalMaterial({     
  color: 0xACACAC,      // Metal color
  metalness: 0.5,       // Metalness factor (1 for metal)
  roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 

const yellow = new THREE.MeshPhysicalMaterial({     
  color: 0xf4b453,      // Metal color
  metalness: 0.5,       // Metalness factor (1 for metal)
  roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 

const lightgrey = new THREE.MeshPhysicalMaterial({ 
color: 0xd1d1d1 , 
metalness: 0.5,         // Metalness factor (1 for metal)
roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 

const white = new THREE.MeshPhysicalMaterial({ 
color: 0xECECEC,
metalness: 0.5,         // Metalness factor (1 for metal)
roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 

const black = new THREE.MeshPhysicalMaterial({ 
color: 0xECECEC,
metalness: 0.8,         // Metalness factor (1 for metal)
roughness: 0,         // Roughness factor (0 for perfectly smooth)
reflectivity: 1,      // Reflectivity factor (1 for full reflectivity)
clearcoat: 1,         // Clearcoat intensity (0 to 1)
clearcoatRoughness: 0.3 // Roughness of the clearcoat layer
}); 

const redlight = new MeshStandardMaterial({ 
color: 0xe71212, 
emissive: 0xe71212, 
emissiveIntensity: 33, 
metalness: 0, 
roughness: 1, 
});

const yellowlight = new MeshStandardMaterial({ 
color: 0xffff00, 
emissive: 0xFFC000, 
emissiveIntensity: 11, 
metalness: 0, 
roughness: 1, 
});

const bluelight = new MeshStandardMaterial({ 
color: 0xe1351e9, 
emissive: 0xe1351e9, 
emissiveIntensity: 11, 
metalness: 0, 
roughness: 1, 
});

const redlight2 = new MeshStandardMaterial({ 
color: 0xe71212, 
emissive: 0xe71212, 
emissiveIntensity: 5, 
metalness: 0, 
roughness: 1, 
});

const bluelight2 = new MeshStandardMaterial({ 
color: 0xe1351e9, 
emissive: 0xe1351e9, 
emissiveIntensity: 5, 
metalness: 0, 
roughness: 1, 
});

const greenlight= new MeshStandardMaterial({ 
color: 0x46bd58,
emissive: 0xa5ce6c, 
emissiveIntensity: 2.5, 
metalness: 0, 
roughness: 1, 
});

//  Traffic
const Traffic = () => {
  // Models
  // Define the materials  f4b453
 
 
  const trafficlight1 = useLoader(OBJLoader, './trafficlight.obj');
  const modelRef = useRef();
  let time = 0;
  let direction = 1; 
  trafficlight1.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Access the mesh
        const mesh = child;
        // Check if the mesh has geometry
        if (mesh.geometry) {
          // Assign custom materials based on mesh names
          if (mesh.name === "white") {
            // Assign a custom material to mesh white
            mesh.material = white; // Assign the first material from your array of materials
          } 
          if (mesh.name === "grey") {
            // Assign a custom material to mesh white
            mesh.material = grey; // Assign the first material from your array of materials
          } 
          if (mesh.name === "darkgrey") {
            // Assign a custom material to mesh white
            mesh.material = darkgrey; // Assign the first material from your array of materials
          } 
          if (mesh.name === "redlight") {
            // Assign a custom material to mesh white
            mesh.material = redlight; // Assign the first material from your array of materials
          } 
          if (mesh.name === "yellowlight") {
            // Assign a custom material to mesh white
            mesh.material = yellowlight; // Assign the first material from your array of materials
          } 
          if (mesh.name === "bluelight") {
            // Assign a custom material to mesh white
            mesh.material = greenlight; // Assign the first material from your array of materials
          }           
          if (mesh.name === "yellow") {
            // Assign a custom material to mesh white
            mesh.material = yellow; // Assign the first material from your array of materials
          } 
      }
    };});


    




  const group2Ref = useRef();
  return (
    <group ref={group2Ref}>
        {/* Fog  <scene fog={new THREE.Fog('#1b3d69', 1, 0)}></scene>  <color args={ [ '#ffffff' ] } attach="background" /> */}
   
      


        <primitive 
        object={trafficlight1} 
        scale={[0.0020, 0.0020, 0.0020]} 
        position={[-0.12, 2.47, 12.75]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-125), 0]} 
        castShadow 
        //ref={meshRef}
        />

  
    </group>
  );
}
export default Traffic;