
import React, { useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const Button = ({ onClick }) => {
  const buttonRef = useRef();
  const { raycaster, camera } = useThree(); // Access raycaster from useThree
  const [isHovered, setIsHovered] = useState(false);
  const audioTexture = null;

  const onClickAudio = (e) => {
    e.stopPropagation();
    console.log('Button clicked');
  };

  const handlePointerOver = (event) => {
    //  console.log('Pointer over blimp');
      event.stopPropagation();
      // Change the cursor style for the pointer over effect
      gsap.to({}, { 
        duration: 0, // No actual animation, just to trigger the onStart
        onStart: () => {
          document.body.style.cursor = 'pointer'; // Change the cursor
        }
      });
      document.body.style.cursor = 'pointer';
    };
    
    const handlePointerOut = (event) => {
    //  console.log('Pointer out of blimp');
      event.stopPropagation();
      // Reset the cursor style when pointer is out
      gsap.to({}, {
        duration: 0, // No animation needed, just triggering the cursor change
        onStart: () => {
          document.body.style.cursor = 'auto';
        }
      });
      document.body.style.cursor = 'auto';
      
    };
  

  useFrame(() => {
    const buttonMesh = buttonRef.current;
    if (buttonMesh) {
      const intersects = raycaster.intersectObject(buttonMesh);
      if (intersects.length > 0) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
      buttonMesh.material.color.set(isHovered ? 0xff0000 : 0xffffff);
    }
  });

  return (
    <mesh 
     // ref={buttonRef} 
     // onClick={onClickAudio} 
      position={[-0.33, 2.225, 0.095]} 
      rotation={[0, Math.PI / 0.480, 0]} 
     // onPointerOver={handlePointerOver}  // Add pointer over event
     // onPointerOut={handlePointerOut}    // Add pointer out event
    >
      <planeGeometry args={[0.3, 0.11]} />
      <meshStandardMaterial 
        transparent 
      //  map={audioTexture} 
        opacity={1} 
      />
    </mesh>
  );
};

export default Button;