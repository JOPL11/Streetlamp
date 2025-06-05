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
const Flashes3 = () => {
    const Light3Ref = useRef();
    const flickerInterval = useRef(Math.random() * 2000);
    const flickerInterval2 = useRef(Math.random() * 1000);
    const [isActive, setIsActive] = useState(false);
  
    // Load and configure the model
    const Light3 = useLoader(OBJLoader, './lightning3.obj');
    Light3.traverse((child) => {
      if (child.isMesh) {
        const material = new MeshStandardMaterial({ 
          color: 0xe1351e9, 
          emissive: 0xe1351e9, 
          emissiveIntensity: 10, 
          metalness: 0, 
          roughness: 1, 
        });
        child.material = material;
      }
    });

    gsap.to(Light3Ref.rotation, {
        duration: 0.7, z: Math.random() * 2 + 55,
        ease: "power4.InOut",
      });
  
    // GSAP timeline for scaling
    useEffect(() => {
      const t3 = gsap.timeline({ repeat: -1 });
      t3.to(Light3Ref.current.scale, {
        x: 0.02, y: Math.random() * Math.PI * 0.001 + 0.00050, z: 0.002,
        duration: 0.75, ease: "power4.InOut"
      }).to(Light3Ref.current.scale, {
        x: Math.random() * Math.PI * 0.001 + 0.06, y: 0.0150, z: 0.0075,
        duration: 0.35, ease: "power3.InOut", delay: 0.65
      });
    }, []);
  
    // Animation control using intervals
    useEffect(() => {
      const intervalId = setInterval(() => {
        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, flickerInterval.current);
      }, flickerInterval.current + flickerInterval2.current);
  
      return () => clearInterval(intervalId);
    }, []);
  
    // Animations that trigger based on isActive state
    useFrame(() => {
      if (isActive && Light3Ref.current) {
        gsap.to(Light3Ref.current, {
          duration: 0.2, opacity: 0.24,
          onStart: () => Light3Ref.current.visible = true,
          onComplete: () => Light3Ref.current.visible = false,
        });
  

  
        // Recalculate intervals for next animations
        flickerInterval.current = Math.random() * 11;
        flickerInterval2.current = Math.random() * 11;
      }
    });



    useEffect(() => {
        // Interval for flickering and rotation
        const intervalId = setInterval(() => {
          if (Light3Ref.current) {
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
    <group>
      <primitive
        object={Light3}
        ref={Light3Ref}
        scale={[0.05, 0.05, 0.001]}
        position={[0., 3.5, 0]} // Initial position set before GSAP adjustment
        rotation={[-0.15, 1.6, 4.5]}

      />
  
    </group>
  );
}
export default Flashes3;