import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three';
import { gsap } from "gsap";
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';

const redlight = new THREE.MeshStandardMaterial({ 
    transparent: true,  
    opacity: 0.1, 
    color: 0xe71212, 
    emissive: 0xe71212, 
    emissiveIntensity: 7.5, 
    metalness: 0, 
    roughness: 0.5,
    blending: THREE.AdditiveBlending,
  });
  // Define the materials  f4b453
 
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

const whitelight= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffffff, 
  emissive: 0xe6662e9, 
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



  
  const MovingCube = () => {
    const boxRef = useRef(); // Reference for the box
    const limo = useLoader(OBJLoader, './aircar_limo.obj');
     const limoRef = useRef();
                 
       // UseEffect to handle the traversal and setting of materials
       useEffect(() => {
        limo.traverse((child) => {
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
                    mesh.material = redlight; // Apply the new material
                    break;
                default:
                  break;
              }
            }
          }
        });
      }, [limo]); // Dependency on limo to run effect when it changes


       
       useEffect(() => {
        function randomDuration() {
          return Math.random() * (30 - 11) + 11; // Generate a random number between 11 and 30
        }
    
        const tCars2 = gsap.timeline({ repeat: -1 });
    
        tCars2
          .to(limoGroupRef.current.rotation, { y: 3.1, duration: 1 }) // Reposition
          .to(limoGroupRef.current.position, { x: -1.7, y: 3.8, z: -13, duration: 7, ease: 'power4.in', onStart: () => console.log('First') }) // First pass
          .to(limoGroupRef.current.rotation, { y: 0.12, duration: 1.8 }) // Reposition 180
          .to(limoGroupRef.current.position, { x: -1.7, y: 1, z: 22, duration: 11, ease: 'power2.out', onStart: () => console.log('Second') }) // Reposition at start
          .to(limoGroupRef.current.rotation, { y: 3.1, duration: 0.5 }) // Reposition 180
          .to(limoGroupRef.current.position, { x: 1.7, y: 2.8, z: -19, duration: 10, ease: 'power3.in', onStart: () => console.log('Third') }) // Reposition
          .to(limoGroupRef.current.rotation, { y: 0.12, duration: 1.5 }) // Reposition
          .to(limoGroupRef.current.position, { x: 1.7, y: 2.5, z: 22, duration: 8, ease: 'power3.out', onStart: () => console.log('Fourth') }) // Move to start
          .to(limoGroupRef.current.rotation, { y: 3.1, duration: 1.8 }) // Reposition 180
          .to(limoGroupRef.current.position, { x: -2.4, y: 2.5, z: -16, duration: 3, ease: 'power1.in' }) // Reposition
          .to(limoGroupRef.current.rotation, { y: 0.12, duration: 3 }) // Reposition
          .to(limoGroupRef.current.position, { x: -2.4, y: 2.5, z: 10.7, duration: randomDuration(), ease: 'power1.out' }) // Travel to start
          // Left Right
          .to(limoGroupRef.current.rotation, { y: 1.8, duration: 2.5 }) // Reposition
          .to(limoGroupRef.current.position, { x: 22, y: 3, z: 10.7, duration: 15, ease: 'power3.inOut' }) // First pass
          .to(limoGroupRef.current.position, { x: 22, y: 3, z: 10.7, duration: 1, ease: 'power2.inOut' }) // Reposition at right end
          .to(limoGroupRef.current.rotation, { y: -2.4, duration: 0.5 }) // Turn around
          .to(limoGroupRef.current.position, { x: -22.0, y: 2, z: 11, duration: 5, ease: 'power2.inOut' }) // Reposition at left end
          .to(limoGroupRef.current.rotation, { y: 1.8, duration: 2.5 }) // Turn back around
          .to(limoGroupRef.current.position, { x: 22, y: 3, z: 12, duration: 15, ease: 'power3.inOut' }) // Pass back to right end
          .to(limoGroupRef.current.rotation, { y: -2.4, duration: 0.5 }) // Turn around
          .to(limoGroupRef.current.position, { x: -2.1, y: 2, z: -11, duration: 5, ease: 'power2.inOut' }); // Pass back to left end
    
        // Cleanup function to kill the timeline
        return () => {
          tCars2.kill();
        };
      }, []); // Empty dependency array to run only once on mount

         /*     material={
            new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(0xe71212).multiplyScalar(0.5),              // Set the specified color
                transparent: true,             // Enable transparency
                opacity: 0.01,                    // Full opacity for bright glow
                depthWrite: false,             // Disable depth writing for blending
                blending: THREE.AdditiveBlending, // Set additive blending
        })
      } 
        */


     const limoGroupRef = useRef();
    // Use frame loop to move the box in a circular pattern
    //  useFrame(() => {
    //  if (boxRef.current) {
       // const time = performance.now() * 0.001;
       // limoGroupRef.current.position.x = Math.sin(time) * 2;
       // limoGroupRef.current.position.z = Math.cos(time) * 2;
       // limoGroupRef.current.position.y = 0;
    //  }
  //  });
   // redlight.blending = THREE.AdditiveBlending; 
   // redlight.depthTest = false;


    const redlight = new THREE.MeshStandardMaterial({ 
      transparent: true,  
      opacity: 0.1, 
      color: 0xe71212, 
      emissive: 0xe71212, 
      emissiveIntensity: 0, 
      metalness: 0, 
      roughness: 0.5,
     // blending: THREE.AdditiveBlending,
    });
        redlight.blending = THREE.AdditiveBlending; 
       // redlight.depthTest = false;

    return (
      <group  ref={limoGroupRef}  position={[-1, 0.65, 17]}> 
      <primitive 
      object={limo} 
      scale={[0.022, 0.022, 0.022]} 
      position={[0, 0, 0]} 
      rotation={[0, 6.15, 0]} 
      />
        {/* Trail component 
        <Trail
          width={6} // Line width
          material={redlight}
      //  color={'#e71212'} // Line color
      //  useAlphaMap
      //  transparent={true}
      //  opacity={0.0001}
          length={50} // Length of the trail
          decay={1} // How fast the trail decays
          attenuation={(t) => t * t} // Makes the trail thinner as it goes
          local={false}
      //  renderOrder={1000}
        >
          <mesh ref={boxRef} position={[0, 0.1, -0.5]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial visible={false}/>
          </mesh>
        </Trail>*/}
      </group>
    );
  }
  
  const Car1 = () => {
    return (
      <>

        <MovingCube />
      </>
    );
  }
  
  export default Car1;