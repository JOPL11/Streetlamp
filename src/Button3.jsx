import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import touchImage from '/touch.png';
import { useLoader } from '@react-three/fiber';

const Button3 = ({ onClick = () => {} }) => {
  console.log('Button 3 present');
  const buttonRef = useRef();
  const [isHovered3, setIsHovered3] = useState(false); // State to track hover state

  const handleClick3 = () => {
    console.log('click3');
    onClick(); // This will now default to an empty function if none is provided
    console.log('click3B');
  };

  const handlePointerOver3 = () => {
    setIsHovered3(true);
    document.body.style.cursor = "pointer";
    console.log('overButton3');
  };

  const handlePointerOut3 = () => {
    setIsHovered3(false);
    document.body.style.cursor = "auto";
    console.log('outButton3');
  };

  // Create texture and geometry
  //const touchTexture = new THREE.TextureLoader().load('./touch.png');
  
    // Load texture with useLoader
    const touchTexture = useLoader(THREE.TextureLoader, touchImage); // Path to your textur

  // Use useFrame to update button appearance or position based on hover state
  useFrame(() => {
    if (buttonRef.current) {
      //buttonRef.current.material.color.set(isHovered3 ? 0xff0000 : 0xffffff); // Change color on hover
    }
  });

  return (
    <mesh 
      ref={buttonRef} 
      scale={[0.66, 0.66, 0.66]} 
      position={[0.018, 0.865, 0.08]} 
      rotation={[0, Math.PI / 0.10, 0]} 
      onClick={handleClick3} 
      onPointerEnter={handlePointerOver3} 
      onPointerLeave={handlePointerOut3}
    >
      <planeGeometry args={[0.44, 0.57]} />
      <meshStandardMaterial 
        transparent 
        map={touchTexture} // Use the loaded texture
        opacity={1} 
      />
    </mesh>
  );
};

export default Button3;