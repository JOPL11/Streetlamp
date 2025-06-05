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
const Blitz = () => {
 
  
    const blitzersGroupRef = useRef();
  
    // Animation logic for both blitzers
    useFrame(() => {
      // Access the group's rotation and update it as needed
      if (blitzersGroupRef.current) {
        // Example rotation animation
        //blitzersGroupRef.current.rotation.y += 0.01;
      }
    });
 
  // Models
  // Define the materials  f4b453
  const bluelight = new MeshStandardMaterial({ 
    color: 0xe1351e9, 
    emissive: 0xe1351e9, 
    emissiveIntensity: 10, 
    metalness: 0, 
    roughness: 1, 
  });
 

  const Blitzer = useLoader(OBJLoader, './lightning2.obj');
  Blitzer.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Access the mesh
      const mesh = child;
      // Check if the mesh has geometry
      if (mesh.geometry) {
        // Assign custom materials based on mesh names
        if (mesh.name === "bluelight") {
          mesh.material = bluelight; 
        }
       
      }
    }   
    });
    const SecondBlitzer = useLoader(OBJLoader, './lightning1.obj');
    SecondBlitzer.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            // Access the mesh
            const mesh = child;
            // Check if the mesh has geometry
            if (mesh.geometry) {
            // Assign custom materials based on mesh names
            if (mesh.name === "bluelight") {
                 mesh.material = bluelight; 
              }
                
            }
          }   
        });


    const [isActive, setIsActive] = useState(true);  // State to manage activation
      
    const blitzerRef = useRef();
    const secondBlitzerRef = useRef();
  
    // ----------------- Rise ----------------------------------------------------------------------------------------------------------------------->


     

    const flickerInterval = useRef(Math.random() * 1820);
    const flickerInterval2 = useRef(Math.random() * 1710);


    useFrame(() => {
      // Ensure blitzerRef.current exists before accessing its properties
      if (blitzerRef.current) {
        // Flicker animation using GSAP
        gsap.to(blitzerRef.current, {
          delay: flickerInterval.current, // Use the stored interval
          duration: 0.05, // Duration of each flicker
          opacity: 1, // Make visible during flicker
          onStart: () => {
            // Set visibility to true at the start of the flicker animation
            blitzerRef.current.visible = true;
          },
          onComplete: () => {
            // After the flicker animation completes, toggle visibility
            blitzerRef.current.visible = false;
          },
        });
    
        // Random rotation animation using GSAP
        gsap.to(blitzerRef.current.rotation, {
          delay: flickerInterval.current, // Use the stored interval
          duration: 0.1, // Duration of the rotation animation
          z: Math.random() * Math.PI * 2, // Random rotation angle along the z-axis
          ease: "power4.InOut", // Easing function
        });

    
        // Recalculate flicker interval for the next animation
        flickerInterval.current = Math.random() * 1520;
      }
    });

    
      useFrame(() => {
        gsap.to(blitzerRef.current.position, {y:0.8, x:0, z:-0.2, duration:0, delay:1});
        gsap.to(secondBlitzerRef.current.position, {y:0.5, x:0, z:-0.2, duration:0, delay:1});
        // Ensure secondBlitzerRef.current exists before accessing its properties
        if (secondBlitzerRef.current) {
          // Flicker animation using GSAP
          gsap.to(secondBlitzerRef.current, {
            delay: flickerInterval.current, // Use the stored interval
            duration: 0.1, // Duration of each flicker
            opacity: 1, // Make visible during flicker
            onStart: () => {
              // Set visibility to true at the start of the flicker animation
              secondBlitzerRef.current.visible = true;
            },
            onComplete: () => {
              // After the flicker animation completes, toggle visibility
              secondBlitzerRef.current.visible = false;
            },
          });
    
          // Random rotation animation using GSAP
          gsap.to(secondBlitzerRef.current.rotation, {
            delay: flickerInterval2.current, // Use the stored interval
            duration: 1, // Duration of the rotation animation
            z: Math.random() * Math.PI * 5.3, // Random rotation angle along the z-axis
            ease: "power4.InOut", // Easing function
          });
    
          // Recalculate flicker interval for the next animation
          flickerInterval2.current = Math.random() * 1052;
        }
      });

    useEffect(() => {
        // Interval for flickering and rotation
        const intervalId = setInterval(() => {
          if (secondBlitzerRef.current) {
            setIsActive(true); // Activate flicker and rotation
    
            // Turn off after execution to wait for the next interval
            setTimeout(() => {
              setIsActive(false);
            }, 100); // Duration of the flicker and rotation effects
          }
        }, 3000); // Flicker every 3 seconds
    
        return () => clearInterval(intervalId);
      }, []);

  return (
    <>
     <group ref={blitzersGroupRef}>
      {/* Add the first blitzer component */}
      <primitive object={Blitzer} 
      ref={blitzerRef} 
      scale={[0.01, 0.0052, 0.002]}
      position={[0.15, 2, 0]}
       rotation={[0, 6.42, 0]}
      />,
      <primitive object={Blitzer} 
      ref={secondBlitzerRef} 
      scale={[0.01, 0.0052, 0.002]}
      position={[0.15, 2, 0]}
       rotation={[0, 6.42, 0]}
      />,
      
      {/* Add the second blitzer component */}
      
      {/* Add the first blitzer component  <primitive object={Blitzer} ref={blitzerRef} scale={[0.01, 0.0052, 0.0082]} position={[-0.18, 0.1, -13.4]} rotation={[0, 3.16, 0]} />,*/}
    

      
    </group>

   
    </>
  );
}
export default Blitz;