import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three'; 
import { gsap } from 'gsap';

const Blitz2 = () => {
  const bluelight2 = useMemo(() => new MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x05615a,
    emissiveIntensity: 1042,
    metalness: 0,
    roughness: 1,
  }), []);

  const Blitzer2 = useLoader(OBJLoader, './lightning2.obj');
  const SecondBlitzer2 = useLoader(OBJLoader, './lightning1.obj');

  useEffect(() => {
    // Set material for Blitzer2
    Blitzer2.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;
        if (mesh.geometry && mesh.name === "bluelight") {
          mesh.material = bluelight2; 
        }
      }   
    });

    // Set material for SecondBlitzer2
    SecondBlitzer2.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;
        if (mesh.geometry && mesh.name === "bluelight") {
          mesh.material = bluelight2; 
        }
      }   
    });

    return () => {
      // Cleanup geometries and materials on unmount
      Blitzer2.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material.dispose) {
            child.material.dispose(); // Dispose only if there's a dispose method
          }
        }
      });

      SecondBlitzer2.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material.dispose) {
            child.material.dispose(); // Dispose only if there's a dispose method
          }
        }
      });
    };
  }, [Blitzer2, SecondBlitzer2, bluelight2]);

  const blitzerRef2 = useRef();
  const secondBlitzerRef2 = useRef();
  const groupRef = useRef();
  const [isActive, setIsActive] = useState(false);
 
  const flickerIntervalA = useRef(Math.random() * 9000); 
  const flickerIntervalB = useRef(Math.random() * 11000); 

  useEffect(() => {
    console.log('Blitz in effect', groupRef.current.position);
    // Initial movement of the group to y: -11 after 40 seconds
    gsap.to(groupRef.current.position, {
      y: -11,
      duration: 0,
      delay: 40,
      onComplete: () => {
        const blitzer2Mover2 = gsap.timeline({ repeat: -1 });
        blitzer2Mover2
          .to(blitzerRef2.current.position, { x: 0, z: 0, y: 0, duration: 1 })
          .to(secondBlitzerRef2.current.position, { x: 0.3, z: -0.3, y: 1, duration: 3 })
          .to(secondBlitzerRef2.current.position, { x: 0.3, z: -0.3, y: -1000, duration: 0 })
          .to(secondBlitzerRef2.current.position, { x: 0.3, z: -0.3, y: -1000, duration: 40 })
          .to(blitzerRef2.current.position, { y: -1000, duration: 1, delay: 2 })
          .to(blitzerRef2.current.position, { y: -1000, duration: 20 });
      }
    });
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const frequency = (Math.sin(time * 0.1) + 1) / 2 * (1 - 0.1) + 0.1;

    if (blitzerRef2.current) {
      gsap.to(blitzerRef2.current, {
        delay: flickerIntervalA.current * frequency,
        duration: 0.05,
        opacity: 1,
        onStart: () => { blitzerRef2.current.visible = true; },
        onComplete: () => { blitzerRef2.current.visible = false; },
      });

      gsap.to(blitzerRef2.current.rotation, {
        delay: flickerIntervalA.current * frequency,
        duration: 0.2,
        z: Math.random() * Math.PI * 2,
        ease: "power4.InOut",
      });

      gsap.to(blitzerRef2.current.scale, {
        delay: flickerIntervalA.current * frequency,
        duration: 0.2,
        y: Math.random() * Math.PI * 1,
        ease: "power4.InOut",
      });

      flickerIntervalA.current = Math.random() * 5200;
    }

    if (secondBlitzerRef2.current) {
      gsap.to(secondBlitzerRef2.current, {
        delay: flickerIntervalB.current * frequency,
        duration: 0.1,
        opacity: 0.5,
        onStart: () => { secondBlitzerRef2.current.visible = true; },
        onComplete: () => { secondBlitzerRef2.current.visible = false; },
      });

      gsap.to(secondBlitzerRef2.current.rotation, {
        delay: flickerIntervalB.current * frequency,
        duration: 0.4,
        z: Math.random() * Math.PI * 2,
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        ease: "power4.InOut",
      });

      flickerIntervalB.current = Math.random() * 10520;
    }
  });

  useEffect(() => {
    const resetScaleInterval = setInterval(() => {
      if (secondBlitzerRef2.current.scale.x < 0.1 || secondBlitzerRef2.current.scale.z < 0.1) {
        secondBlitzerRef2.current.scale.set(1, 2, 2);
      }
    }, 3000);
    return () => clearInterval(resetScaleInterval);
  }, []);

  useEffect(() => {
    gsap.to(secondBlitzerRef2.current.position, { y: 10, duration: 17 });
    gsap.to(secondBlitzerRef2.current.position, { y: 0, duration: 17 });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(secondBlitzerRef2.current.scale, { x: 0.0021, z: 0.0021, duration: 0.2 })
      .to(secondBlitzerRef2.current.scale, { x: 0.00014, z: 0.00018, duration: 0.5 });
  }, []);

  useEffect(() => {
    const intervalIdA = setInterval(() => {
      if (blitzerRef2.current) {
        setIsActive(true);
        setTimeout(() => { setIsActive(false); }, 100);
      }
    }, 355000);
    return () => clearInterval(intervalIdA);
  }, []);

  return (
    <group ref={groupRef} position={[0, -10, -12]} scale={[0.4, 0.4, 0.4]}>  
      <primitive
        object={Blitzer2}
        ref={blitzerRef2}
        scale={[2, 2, 2]}
        position={[0.35, -11, 0.7]}
        rotation={[0, 6.42, 0]}
      />
      <primitive
        object={SecondBlitzer2}
        ref={secondBlitzerRef2}
        scale={[1, 2, 3]}
        position={[0.05, -11, -0.05]}
        rotation={[0, 180 + 80, 0]}
      />
    </group>
  );
}

export default Blitz2;