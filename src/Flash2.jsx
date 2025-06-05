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
const Flashes2 = () => {
  // Models
  // Define the materials  f4b453
  const bluelight2 = new MeshStandardMaterial({ 
    color: 0xe1351e9, 
    emissive: 0xe1351e9, 
    emissiveIntensity: 10, 
    metalness: 0, 
    roughness: 1, 
  });
  const whitelight = new MeshStandardMaterial({ 
    color: 0xeFFFFFF, 
    emissive: 0xe1351e9, 
    emissiveIntensity: 10, 
    metalness: 0, 
    roughness: 1, 
  });
 


    // Inside your component where you define your scene and other elements
    const Light1 = useLoader(OBJLoader, './lightning1.obj');

    Light1.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            // Access the mesh
            const mesh = child;
            // Check if the mesh has geometry
            if (mesh.geometry) {
            // Assign custom materials based on mesh names
            if (mesh.name === "bluelight") {
                 mesh.material = whitelight; 
              }
                
            }
          }   
        });

        const Light1Ref = useRef();
        const flickerInterval = useRef(Math.random() * 170);
        const flickerInterval2 = useRef(Math.random() * 210);
        const [isActive, setIsActive] = useState(true);  // State to manage activation
      
        useEffect(() => {
          // Timeline for scaling
          const tl = gsap.timeline({ repeat: -1 });
          tl.to(Light1Ref.current.scale, {
            x: Math.random() / 2 + 0.5,
            z: Math.random() / 2 + 0.5,
            y: Math.random() / 2 + 0.5,
            duration: 0.75,
            ease: "power4.InOut"
          }).to(Light1Ref.current.scale, {
            x: Math.random() / 2 + 0.05,
            z: Math.random() * 2 + 0.05,
            y: Math.random() / 2 + 0.05,
            duration: 0.75,
            ease: "power3.InOut"
          });
        }, []);
      
        useEffect(() => {
          // Interval for flickering and rotation
          const intervalId = setInterval(() => {
            if (Light1Ref.current) {
              setIsActive(true); // Activate flicker and rotation
      
              // Turn off after execution to wait for the next interval
              setTimeout(() => {
                setIsActive(false);
              }, 100); // Duration of the flicker and rotation effects
            }
          }, 3000); // Flicker every 3 seconds
      
          return () => clearInterval(intervalId);
        }, []);
      
        useFrame(() => {
          if (isActive && Light1Ref.current) {
            // Flicker animation using GSAP
            gsap.to(Light1Ref.current, {
              duration: 0.8,
              opacity: 0.1,
              onStart: () => {
                Light1Ref.current.visible = true;
              },
              onComplete: () => {
                Light1Ref.current.visible = false;
              },
            });
      
            // Random rotation animation using GSAP
            gsap.to(Light1Ref.current.rotation, {
              duration: 0.8,
              z: Math.random() * Math.PI * 2,
              ease: "power4.InOut",
            });
          }
        });

        useEffect(() => {
          // Interval for flickering and rotation
          const intervalIdB = setInterval(() => {
            if (Light1Ref.current) {
              setIsActive(true); // Activate flicker and rotation
        
              // Turn off after execution to wait for the next interval
              setTimeout(() => {
                setIsActive(false);
              }, 100); // Duration of the flicker and rotation effects
            }
          }, 1000); // Flicker every minute
        
          return () => clearInterval(intervalIdB);
        }, []);



  return (
    <group>
      <primitive
        object={Light1}
        ref={Light1Ref}
        scale={[5000, 5000, 50]}
        position={[-150.2, 99, -100]} // Initial position set before GSAP adjustment
        rotation={[2, 6.4, 20]}

      />
  
    </group>
  );
}
export default Flashes2;