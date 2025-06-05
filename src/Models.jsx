import * as THREE from 'three'; 
import { MeshStandardMaterial, MeshPhysicalMaterial } from 'three'; 
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import React, { useRef } from 'react';
import { OrbitControls, MeshReflectorMaterial, BakeShadows, Html} from '@react-three/drei';
 
 // Define the materials
 // const materialA = new THREE.MeshStandardMaterial({ color: 0x000000 }); 
 // const materialB = new THREE.MeshStandardMaterial({ color: 0xffffff }); 

    // Create an array to hold the materials
    /*const materials = [materialA, materialB];
    const sign = useLoader(OBJLoader, './sign2.obj');
    sign.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Access the mesh
        const mesh = child;
    
        // Check if the mesh has geometry
        if (mesh.geometry) {
          // Assign custom materials based on mesh names
          if (mesh.name === "a") {
            // Assign a custom material to mesh A
            mesh.material = materials[0]; // Assign the first material from your array of materials
          } else if (mesh.name === "b") {
            // Assign a custom material to mesh B
            mesh.material = materials[1]; // Assign the second material from your array of materials
          }
          // Add more conditions for additional meshes if needed
        }
      }
    });*/

  // Models
  // Define the materials
  const Models = () => {



  const grey = new THREE.MeshPhysicalMaterial({     
      color: 0xACACAC,      // Metal color
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
 


  const objA = useLoader(OBJLoader, './white.obj');
  objA.traverse((child) => {
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
    }
  };});
  const objB = useLoader(OBJLoader, './grey.obj');
  objB.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Access the mesh
      const mesh = child;
      // Check if the mesh has geometry
      if (mesh.geometry) {
        // Assign custom materials based on mesh names
        if (mesh.name === "grey") {
          // Assign a custom material to mesh white
          mesh.material = grey; // Assign the first material from your array of materials
        } 
    }
  };});
  const objC = useLoader(OBJLoader, './lightgrey.obj');
  objC.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Access the mesh
      const mesh = child;
      // Check if the mesh has geometry
      if (mesh.geometry) {
        // Assign custom materials based on mesh names
        if (mesh.name === "lightgrey") {
          // Assign a custom material to mesh white
          mesh.material = lightgrey; // Assign the first material from your array of materials
        } 
    }
  };});
  const objD = useLoader(OBJLoader, './black.obj');
  objD.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Access the mesh
      const mesh = child;
      // Check if the mesh has geometry
      if (mesh.geometry) {
        // Assign custom materials based on mesh names
        if (mesh.name === "black") {
          // Assign a custom material to mesh white
          mesh.material = black; // Assign the first material from your array of materials
        } 
    }
  };});
  

  const obj2 = useLoader(OBJLoader, './streetlamper2lights.obj');
  const material2 = new MeshStandardMaterial({ 
    color: 0xffff00, 
    emissive: 0xFFC000, 
    emissiveIntensity: 3, 
    metalness: 0, 
    roughness: 1, 
  });
  obj2.traverse((child) => {
    if (child.isMesh) {
      child.material = material2;
    }
  });

  const obj3 = useLoader(OBJLoader, './wires.obj');
  obj3.traverse((child) => {
    if (child.isMesh) {
      child.material = black;
    }
  });









}

export const objA = new OBJLoader().load('./white.obj');
export const objB = new OBJLoader().load('./grey.obj');
export const objC = new OBJLoader().load('./lightgrey.obj');
export const objD = new OBJLoader().load('./black.obj');
export const obj2 = new OBJLoader().load('./streetlamper2lights.obj');
export const obj3 = new OBJLoader().load('./wires.obj');
export const cam1 = new OBJLoader().load('./camera1.obj');
export const cam2 = new OBJLoader().load('./camera2.obj');