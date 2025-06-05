import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial, BakeShadows, Html} from '@react-three/drei';
import { BlendFunction } from 'postprocessing';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial } from 'three'; 
import * as THREE from 'three'; 
import Button from './Button.jsx';



// Define the materials  f4b453
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
  roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
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
const red = new MeshStandardMaterial({ 
color: 0xe71212, 
emissive: 0xe71212, 
emissiveIntensity: 3, 
metalness: 0, 
roughness: 1, 
});


//  Experience
const Traffic = () => {
  // Models
  
 


  const objT = useLoader(OBJLoader, './traffic_export.obj');
  console.log(objT);
  objT.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Access the mesh
      const mesh = child;
      // Check if the mesh has geometry
      if (mesh.geometry) {
        // Assign custom materials based on mesh names
        if (mesh.name === "white") {
          mesh.material = white; 
        }
        if (mesh.name === "yellow") {
          mesh.material = yellow; 
        } 
        if (mesh.name === "grey") {
            mesh.material = grey; 
          } 
        }
      }   
    });



  return (
    <group>
      {objT && <primitive object={objT} />}
      <Button onClick={handleClick} />
    </group>
  );
}
export default Traffic;