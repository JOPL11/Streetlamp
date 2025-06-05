import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial, BakeShadows, Html} from '@react-three/drei';
import { BlendFunction } from 'postprocessing';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial } from 'three'; 
import * as THREE from 'three'; 
import gsap from '../public/resources/gsap/all.js'
import Button from './Button.jsx';







//  Experience
const Blitz2 = () => {
  // Models
  // Define the materials  f4b453
  const bluelight2 = new MeshStandardMaterial({ 
    color: 0xe1351e9, 
    emissive: 0xe1351e9, 
    emissiveIntensity: 10, 
    metalness: 0, 
    roughness: 1, 
  });
 

  const Blitzer2 = useLoader(OBJLoader, './lightning2.obj');
  Blitzer2.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Access the mesh
      const mesh = child;
      // Check if the mesh has geometry
      if (mesh.geometry) {
        // Assign custom materials based on mesh names
        if (mesh.name === "bluelight") {
          mesh.material = bluelight2; 
        }
       
      }
    }   
    });
    // Inside your component where you define your scene and other elements
    const SecondBlitzer2 = useLoader(OBJLoader, './lightning1.obj');
    SecondBlitzer2.y=-11;
    SecondBlitzer2.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            // Access the mesh
            const mesh = child;
            // Check if the mesh has geometry
            if (mesh.geometry) {
            // Assign custom materials based on mesh names
            if (mesh.name === "bluelight") {
                 mesh.material = bluelight2; 
              }
                
            }
          }   
        });


    const blitzerRef2 = useRef();
    const secondBlitzerRef2 = useRef();



   

    
    const flickerIntervalA = useRef(Math.random() * 1820);
    const flickerIntervalB = useRef(Math.random() * 1710);
    
    
    useEffect(() => {
      gsap.to(blitzerRef2.current.position, {y:4.8, x:-3, z:-0.2, duration:0, delay:5});
      gsap.to(secondBlitzerRef2.current.position, {y:4.5, x:-3, z:-0.2, duration:0, delay:11});
      });
    useFrame(() => {
      // Ensure blitzerRef.current exists before accessing its properties
      if (blitzerRef2.current) {
        // Flicker animation using GSAP
        gsap.to(blitzerRef2.current, {
          delay: flickerIntervalA.current, // Use the stored interval
          duration: 0.05, // Duration of each flicker
          opacity: 1, // Make visible during flicker
          onStart: () => {
            // Set visibility to true at the start of the flicker animation
            blitzerRef2.current.visible = true;
          },
          onComplete: () => {
            // After the flicker animation completes, toggle visibility
            blitzerRef2.current.visible = false;
          },
        });
    
        // Random rotation animation using GSAP
        gsap.to(blitzerRef2.current.rotation, {
          delay: flickerIntervalA.current, // Use the stored interval
          duration: 0.1, // Duration of the rotation animation
          z: Math.random() * Math.PI * 2, // Random rotation angle along the z-axis
          ease: "power4.InOut", // Easing function
        });

    
        // Recalculate flicker interval for the next animation
        flickerIntervalA.current = Math.random() * 1520;
      }
    });

        



      useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(secondBlitzerRef2.current.scale, { x: 0.015, z: 0.0012,  duration: 0.5 })
          .to(secondBlitzerRef2.current.scale, { x: 0.0021, z: 0.0021,  duration: 0.5 });
      }, []);
    
      useFrame(() => {
        // Ensure secondBlitzerRef.current exists before accessing its properties
        if (secondBlitzerRef2.current) {
          // Flicker animation using GSAP
          gsap.to(secondBlitzerRef2.current, {
            delay: flickerIntervalA.current, // Use the stored interval
            duration: 0.1, // Duration of each flicker
            opacity: 1, // Make visible during flicker
            onStart: () => {
              // Set visibility to true at the start of the flicker animation
              secondBlitzerRef2.current.visible = true;
            },
            onComplete: () => {
              // After the flicker animation completes, toggle visibility
              secondBlitzerRef2.current.visible = false;
            },
          });
    
          // Random rotation animation using GSAP
          gsap.to(secondBlitzerRef2.current.rotation, {
            delay: flickerIntervalB.current, // Use the stored interval
            duration: 1, // Duration of the rotation animation
            z: Math.random() * Math.PI * 2, // Random rotation angle along the z-axis
            ease: "power4.InOut", // Easing function
          });
    
          // Recalculate flicker interval for the next animation
          flickerIntervalB.current = Math.random() * 1052;
        }
      });




  return (
    <group>
      <primitive
        object={Blitzer2}
        ref={blitzerRef2}
        scale={[0.01, 0.0052, 0.002]}
       position={[0.15, -11, -0.05]}
        rotation={[0, 6.42, 0]}
      />
      <primitive
        object={SecondBlitzer2}
        ref={secondBlitzerRef2}
        scale={[1.08, 0.028, 1.09]}
       position={[0.05, -11, -0.05]}
        rotation={[0, 180 + 150, 0]} // Rotate by 180 degrees around y-axis
      />
    </group>
  );
}
export default Blitz2;