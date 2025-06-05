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
const Flashes = () => {
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
    const Light2 = useLoader(OBJLoader, './lightning1.obj');

    Light2.traverse((child) => {
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


        const Light2Ref = useRef();
        const [isActive, setIsActive] = useState(true);  // State to manage activation
      
        useEffect(() => {
          // Timeline for scaling
          const tl2 = gsap.timeline({ repeat: -1 });
          //tl2.to(Light2Ref.current.rotation.z, {  duration: 0.75, ease: "power4.InOut", repeat: -1, y: Math.PI * 2 })
          tl2.to(Light2Ref.current.scale, { x: 0.005, z: 0.005,  y:0.01, duration: 0.75, ease: "power4.InOut" })
             .to(Light2Ref.current.scale, { x: 0.0005, z: 0.00012, y:0.0005,  duration: 0.75, ease: "power4.InOut" });
            
        }, []);
      
        useEffect(() => {
          // Interval for flickering and rotation gsap.to(Light2Ref.current.rotation.z, {  duration: 0.75, ease: "power4.InOut", repeat: -1, y: Math.PI * 2 });
          const intervalIdA = setInterval(() => {
            if (Light2Ref.current) {
              setIsActive(true); // Activate flicker and rotation
      
              // Turn off after execution to wait for the next interval
              setTimeout(() => {
                setIsActive(false);
              }, 100); // Duration of the flicker and rotation effects
            }
          }, 3000); // Flicker every 3 seconds
      
          return () => clearInterval(intervalIdA);
        }, []);
      
        useFrame(() => {
          if (isActive && Light2Ref.current) {
            // Flicker animation using GSAP
            gsap.to(Light2Ref.current, {
              duration: 0.8,
              opacity: 0.1,
              onStart: () => {
                Light2Ref.current.visible = true;
              },
              onComplete: () => {
                Light2Ref.current.visible = false;
              },
            });
      
            // Random rotation animation using GSAP
            gsap.to(Light2Ref.current.rotation, {
              duration: 0.7,
              z: Math.random() * Math.PI * 2,
              ease: "power4.InOut",
            });
          }
        });
    
        useEffect(() => {
          // Interval for flickering and rotation
          const intervalIdA = setInterval(() => {
            if (Light2Ref.current) {
              setIsActive(true); // Activate flicker and rotation
      
              // Turn off after execution to wait for the next interval
              setTimeout(() => {
                setIsActive(false);
              }, 100); // Duration of the flicker and rotation effects
            }
          }, 3000); // Flicker every 3 seconds
      
          return () => clearInterval(intervalIdA);
        }, []);
    


  return (
    <group>
      <primitive
        object={Light2}
        ref={Light2Ref}
        scale={[0.001, 0.001, 0.1]}
        position={[0.51, 3.95, -0.4]} // Initial position set before GSAP adjustment
        rotation={[-0.01, 150 + 180, 2]}

      />
  
    </group>
  );
}
export default Flashes;