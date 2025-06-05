import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three';
import { gsap } from "gsap";
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';

const redlight = new THREE.MeshStandardMaterial({ 
    transparent: true,  
    opacity: 0.1, 
    color: 0xe71212, 
    emissive: 0xe71212, 
    emissiveIntensity: 7.5, 
    metalness: 0, 
    roughness: 0.5,
  });
  // Define the materials  f4b453
  const grey = new THREE.MeshPhysicalMaterial({     
    color: 0xACACAC,      // Metal color
    metalness: 0.5,       // Metalness factor (1 for metal)
    roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2, // Roughness of the clearcoat layer
    transparent: true,
    opacity: 1,
}); 
const yellow = new THREE.MeshPhysicalMaterial({  
    transparent: true,  
    opacity: 1, 
    color: 0xf4b453,      // Metal color
    metalness: 0.5,       // Metalness factor (1 for metal)
    roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const carRed = new THREE.MeshPhysicalMaterial({    
  transparent: true,  
  opacity: 1, 
  color: 0xe71212,      // Metal color
  metalness: 0.5,       // Metalness factor (1 for metal)
  roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const lightgrey = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xd1d1d1 , 
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const blue = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0x8eb5e2,
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const metalblue = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0x8eb5e2,
  metalness: 0.7,         // Metalness factor (1 for metal)
  roughness: 0.3,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const green = new THREE.MeshPhysicalMaterial({     
  transparent: true,  
  opacity: 1,
  color: 0x6c8f4e,      // Metal color
  metalness: 0.5,       // Metalness factor (1 for metal)
  roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.0,       // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const glass = new THREE.MeshPhysicalMaterial({     
  transparent: true,  
  opacity: 1,
  transmission: 1,     // Metal color
  metalness: 0.55,        // Metalness factor (1 for metal)
  roughness: 0.1,        // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.8,     // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,          // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.05, // Roughness of the clearcoat layer
  envMapIntensity: 0.5,
  //roughnessMap: roughnessTexture
}); 
const black = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xECECEC,
  metalness: 0.8,         // Metalness factor (1 for metal)
  roughness: 0,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 1,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.3 // Roughness of the clearcoat layer
}); 
const matteblack = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0x000000,
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 

const redlightOld = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xe71212, 
  emissive: 0xeff471a, 
  emissiveIntensity: 3, 
  metalness: 0, 
  roughness: 1, 
});

const blimpRed = new MeshStandardMaterial({ 
  color: 0xeff471a, 
  emissive: 0xe71212, 
  emissiveIntensity: 6, 
  metalness: 0, 
  roughness: 1, 
});
const yellowlight = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffff00, 
  emissive: 0xFFC000, 
  emissiveIntensity: 11, 
  metalness: 0, 
  roughness: 1, 
}); 
const white = new THREE.MeshPhysicalMaterial({ 
  color: 0xECECEC,
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const yellowlightsoft = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffff00, 
  emissive: 0xFFC000, 
  emissiveIntensity: 2, 
  metalness: 0, 
  roughness: 1, 
});
const wireframeMaterial = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xeb9d20, 
  emissive: 0xeb9d20, 
  emissiveIntensity: 1, 
  metalness: 0, 
  roughness: 1,
  wireframe: true,
  wireframeLinewidth: 0.2, 
});
const bluelight = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xe1351e9, 
  emissive: 0xe1351e9, 
  emissiveIntensity: 1, 
  metalness: 0, 
  roughness: 1, 
});
const redlight2 = new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xe71212, 
  emissive: 0xe71212, 
  emissiveIntensity: 2, 
  metalness: 0, 
  roughness: 1, 
});
const bluelight2 = new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xe1351e9, 
  emissive: 0xe1351e9, 
  emissiveIntensity: 5, 
  metalness: 0, 
  roughness: 1, 
});
const whitelight= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffffff, 
  emissive: 0xe6662e9, 
  emissiveIntensity: 2.5, 
  metalness: 0, 
  roughness: 1, 
});
const windowlight = new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xffff00, 
  emissive: 0xFFC000, 
  emissiveIntensity: 0.25, 
  metalness: 0, 
  roughness: 1, 
});
const darkgrey = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xd1d1d1 , 
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const purplelight= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0x670b76, 
  emissive: 0x880b9a, 
  emissiveIntensity: 2.5, 
  metalness: 0, 
  roughness: 1, 
});
const orangelight= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xeb9d20,
  emissive: 0xeb9d20, 
  emissiveIntensity: 2.5, 
  metalness: 0, 
  roughness: 1, 
});
const orangelightsoft= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xeb9d20,
  emissive: 0xeb9d20, 
  emissiveIntensity: 0.5, 
  metalness: 0, 
  roughness: 1, 
});
const whitelightC= new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xffffff, 
  emissive: 0xe6662e9, 
  emissiveIntensity: 5.5, 
  metalness: 0, 
  roughness: 1, 
});
const brightwhite= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffffff, 
  emissive: 0xe6662e9, 
  emissiveIntensity: 16, 
  metalness: 0, 
  roughness: 1, 
});
const greenlight= new MeshStandardMaterial({ 
  transparent: true,
  opacity: 1,  
  color: 0x46bd58,
  emissive: 0xa5ce6c, 
  emissiveIntensity: 2.5, 
  metalness: 0, 
  roughness: 1, 
});
const envMap = new CubeTextureLoader().load([
    './px.jpg', // Positive X
    './nx.jpg', // Negative X
    './py.jpg', // Positive Y
    './ny.jpg', // Negative Y
    './pz.jpg', // Positive Z
    './nz.jpg', // Negative Z
  ]);
  const chrome = new THREE.MeshPhysicalMaterial({ 
    transparent: true,  
    opacity: 1,
    color: 0xc6c6c6,
    metalness:0.5,         // Metalness factor (1 for metal)
    roughness: 0,         // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.5,         // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.5,
    envMap: envMap, // Roughness of the clearcoat layer
    envMapIntensity: 0.75,
  }); 


  
  const McFly = () => {
    const boxRef = useRef(); // Reference for the box
    const delorean = useLoader(OBJLoader, './aircar_delorean.obj');
    const deloreanRef = useRef();
                 
       // UseEffect to handle the traversal and setting of materials
       useEffect(() => {
        delorean.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const mesh = child;
            if (mesh.geometry) {
              // Set materials based on mesh name
              switch (mesh.name) {
                case "whitelight":
                  mesh.material = whitelight;
                  break;
                case "glass":
                  mesh.material = glass;
                  break;
                case "black":
                  mesh.material = black;
                  break;
                case "yellowlightsoft":
                  mesh.material = orangelight;
                  break;
                case "grey":
                  mesh.material = black;
                  break;
                case "silver":
                  mesh.material = green;
                  break;
                case "orangelight":
                  mesh.material = orangelight;
                  break;
                case "redlight":
                  mesh.material = redlight; // Apply the material
                  break;
                default:
                  break;
              }
            }
          }
        });
      }, [delorean]); // Dependency on limo to run effect when it changes


       
       useEffect(() => {
        function randomDuration() {
          return Math.random() * (30 - 11) + 11; // Generate a random number between 11 and 30
        }
    
        const tCars2 = gsap.timeline({ repeat: -1 });
    
        tCars2
        .to(deloreanGroupRef.current.position, { x: -2.1, y: 2.5, z: -12, duration: 12, ease: 'power2.inOut' }) // First pass
        .to(deloreanGroupRef.current.position, { x: -2.1, y: 3.2, z: 17, duration: 4.9, ease: 'power2.inOut' }) // "Hit the other car" run
        .to(deloreanGroupRef.current.rotation, { y: 1.8, duration: 0.2 }) // Reposition 90
        .to(deloreanGroupRef.current.position, { x: 2.7, y: 2.7, z: 17, duration: 2, ease: 'power2.inOut' }) // Reposition
        .to(deloreanGroupRef.current.rotation, { y: 3.1, duration: 1 }) // Reposition
        .to(deloreanGroupRef.current.position, { x: 2.7, y: 4.0, z: 17, duration: 2, ease: 'power2.inOut' }) // Reposition
        .to(deloreanGroupRef.current.position, { x: 2.2, y: 4.1, z: -14, duration: 8, ease: 'power2.in' }) // Travel to end
        .to(deloreanGroupRef.current.rotation, { y: -1.7, duration: 3 }) // Reposition -90
        .to(deloreanGroupRef.current.position, { x: -2.1, y: 5.3, z: -16.2, duration: 1.5, ease: 'power2.out' }) // Reposition
        .to(deloreanGroupRef.current.rotation, { y: 0.11, duration: 3 }) // Reposition
        .to(deloreanGroupRef.current.position, { x: -0.9, y: 1.8, z: -11.3, duration: 3, ease: 'power2.inOut' }) // Reposition
        .to(deloreanGroupRef.current.position, { x: -0.9, y: 2.2, z: -10.3, duration: 5, ease: 'power2.inOut' }) // First pass
        .to(deloreanGroupRef.current.position, { x: -2.0, y: 2.0, z: 18, duration: randomDuration(), ease: 'power2.inOut' }) // Reposition at start
        .to(deloreanGroupRef.current.rotation, { y: 1.8, duration: 1 }) // Reposition
        .to(deloreanGroupRef.current.position, { x: 2.7, y: 2.1, z: 18, duration: 5.5, ease: 'power2.inOut' }) // Reposition
        .to(deloreanGroupRef.current.rotation, { y: 3.1, duration: 1 }) // Reposition
        .to(deloreanGroupRef.current.position, { x: 2.2, y: 5.2, z: 18, duration: 0.5, ease: 'power2.inOut' }) // Reposition
        .to(deloreanGroupRef.current.position, { x: 2.2, y: 5.2, z: -13.1, duration: 6, ease: 'power2.in' }) // Travel to end
        .to(deloreanGroupRef.current.rotation, { y: -1.8, duration: 4 }) // Reposition
        .to(deloreanGroupRef.current.position, { x: -2.2, y: 2.0, z: -13.1, duration: 5.5, ease: 'power2.out' }) // Reposition
        .to(deloreanGroupRef.current.rotation, { y: 0.11, duration: 4 }) // Reposition
        .to(deloreanGroupRef.current.position, { x: -2.1, y: 2.5, z: -12, duration: 2, ease: 'power2.inOut' }); // Second pass
    
        // Cleanup function to kill the timeline
        return () => {
          tCars2.kill();
        };
      }, []); // Empty dependency array to run only once on mount




     const deloreanGroupRef = useRef();
    // Use frame loop to move the box in a circular pattern
    useFrame(() => {
      if (boxRef.current) {
        const time = performance.now() * 0.001;
       // limoGroupRef.current.position.x = Math.sin(time) * 2;
       // limoGroupRef.current.position.z = Math.cos(time) * 2;
       // limoGroupRef.current.position.y = 0;
      }
    });

    const redlight = new THREE.MeshStandardMaterial({ 
      transparent: true,  
      opacity: 0.1, 
      color: 0xe71212, 
      emissive: 0xe71212, 
      emissiveIntensity: 7.5, 
      metalness: 0, 
      roughness: 0.5,
    });
  
    return (
      <group  ref={deloreanGroupRef}  position={[-4, 2, -2]}>
      <primitive 
      object={delorean} 
      ref={deloreanRef} 
      scale={[0.0033, 0.0033, 0.0033]} 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]} 
      castShadow  
      />
        {/* Trail component 
        <Trail 
            width={6.5}          // Keep a constant width 
            color={'#e71212'}    // Solid red color 
            length={50}          // Length of the trail 
            decay={1}            // How fast the trail decays 
            attenuation={(t) => t * t}         // Keep the trail width constant 
            local={false}  
            >
          <mesh ref={boxRef} position={[0, 0, 0.5]} >
          <boxGeometry args={[0.1, 0.1, 0.1]}/>
            <meshStandardMaterial color="blue" visible={false}/>
          </mesh>
        </Trail>*/} 
      </group>
    );
  }
  
  const Car2 = () => {
    return (
      <>
        
        <McFly />
      </>
    );
  }
  
  export default Car2;